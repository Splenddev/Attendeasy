import { useState, useEffect } from 'react';
import TextArea from '../../../../components/TextArea/TextArea';

const STATUS_OPTIONS = [
  'unconfirmed',
  'pending_approval',
  'rescheduled',
  'postponed',
  'holding',
  'held',
  'partial',
  'cancelled',
  'missed',
  'disrupted',
  'makeup',
  'offsite',
];

// Helper to format status nicely
const formatStatusLabel = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ');

export default function UpdateInstanceStatus({ instance, onSuccess }) {
  // Initial states from instance props
  const [status, setStatus] = useState(instance.classStatus || 'unconfirmed');
  const [newDate, setNewDate] = useState(
    instance.rescheduledToDate
      ? new Date(instance.rescheduledToDate).toISOString().substring(0, 10)
      : ''
  );
  const [startTime, setStartTime] = useState(instance.updatedTime?.start || '');
  const [endTime, setEndTime] = useState(instance.updatedTime?.end || '');
  const [message, setMessage] = useState(''); // generic message textarea for notes/reasons
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Status groups for UI logic
  const showRescheduleFields = ['postponed', 'rescheduled', 'makeup'].includes(
    status
  );
  const showCancellationReason = status === 'cancelled';
  const showPendingApprovalNote = status === 'pending_approval';
  const showHoldingReason = status === 'holding';
  const showIncidentNotes = ['missed', 'disrupted', 'partial'].includes(status);
  const showHeldConfirmation = status === 'held';

  // Validation state to disable submit button if invalid input
  const isValidDate = !showRescheduleFields || newDate !== '';
  const isValidTime =
    !showRescheduleFields || !startTime || !endTime || startTime <= endTime;
  const isValidMessage = !showCancellationReason || message.trim() !== '';

  // Reset to original instance values
  const handleReset = () => {
    setStatus(instance.classStatus || 'unconfirmed');
    setNewDate(
      instance.rescheduledToDate
        ? new Date(instance.rescheduledToDate).toISOString().substring(0, 10)
        : ''
    );
    setStartTime(instance.updatedTime?.start || '');
    setEndTime(instance.updatedTime?.end || '');
    setMessage('');
    setError(null);
  };

  // Submit update handler
  const handleSubmit = async () => {
    setError(null);

    // Basic validation
    if (!isValidDate) {
      setError('Please select a valid new date.');
      return;
    }
    if (!isValidTime) {
      setError('Start time must be less than or equal to end time.');
      return;
    }
    if (!isValidMessage) {
      setError('Please provide a cancellation reason.');
      return;
    }

    setLoading(true);
    const payload = { classStatus: status };

    if (showRescheduleFields) {
      payload.rescheduledToDate = newDate;
      payload.updatedTime = {
        start: startTime || null,
        end: endTime || null,
      };
    }
    if (
      showCancellationReason ||
      showHoldingReason ||
      showIncidentNotes ||
      showHeldConfirmation
    ) {
      // Attach the message as relevant (reason, notes, confirmation)
      if (message.trim()) payload.lecturerMessage = message.trim();
    }

    try {
      const res = await fetch(
        `/api/schedule-instances/${instance._id}/status`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to update status');
      }

      const data = await res.json();
      onSuccess && onSuccess(data);
      setMessage('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="update-instance-status"
      style={{ maxWidth: 500 }}>
      <b style={{ marginBottom: 12 }}>
        Update Status for {instance.scheduleId?.courseTitle || 'Schedule'}
      </b>
      <p style={{ marginBottom: 16 }}>
        <strong>Date:</strong>{' '}
        {new Date(instance.classDate).toLocaleDateString()}
        <br />
        <strong>Current Status:</strong>{' '}
        {formatStatusLabel(instance.classStatus)}
      </p>

      <label
        htmlFor="status-select"
        style={{ fontWeight: 'bold', display: 'block', marginBottom: 8 }}>
        Select New Status:
      </label>
      <select
        id="status-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        disabled={loading || showPendingApprovalNote}
        style={{
          width: '100%',
          padding: '0.5rem',
          marginBottom: 16,
          fontSize: 16,
          backgroundColor: showPendingApprovalNote ? '#eee' : 'white',
          cursor: showPendingApprovalNote ? 'not-allowed' : 'pointer',
        }}>
        {STATUS_OPTIONS.map((opt) => (
          <option
            key={opt}
            value={opt}>
            {formatStatusLabel(opt)}
          </option>
        ))}
      </select>

      {showPendingApprovalNote && (
        <p style={{ fontStyle: 'italic', marginBottom: 16, color: '#555' }}>
          This instance is pending approval and cannot be edited at this time.
        </p>
      )}

      {showRescheduleFields && (
        <fieldset
          style={{
            marginBottom: 16,
            border: '1px solid #ccc',
            padding: 12,
            borderRadius: 6,
          }}>
          <legend style={{ fontWeight: 'bold', marginBottom: 8 }}>
            {formatStatusLabel(status)} Details
          </legend>

          <label
            htmlFor="new-date"
            style={{ display: 'block', marginBottom: 6 }}>
            New Date:
          </label>
          <input
            type="date"
            id="new-date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            disabled={loading}
            style={{ width: '100%', padding: '0.4rem', marginBottom: 12 }}
          />

          <label
            htmlFor="start-time"
            style={{ display: 'block', marginBottom: 6 }}>
            Start Time (optional):
          </label>
          <input
            type="time"
            id="start-time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            disabled={loading}
            style={{ width: '100%', padding: '0.4rem', marginBottom: 12 }}
          />

          <label
            htmlFor="end-time"
            style={{ display: 'block', marginBottom: 6 }}>
            End Time (optional):
          </label>
          <input
            type="time"
            id="end-time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            disabled={loading}
            style={{ width: '100%', padding: '0.4rem' }}
          />
        </fieldset>
      )}

      {(showCancellationReason ||
        showHoldingReason ||
        showIncidentNotes ||
        showHeldConfirmation) && (
        <>
          <label
            htmlFor="message"
            style={{ fontWeight: 'bold', display: 'block', marginBottom: 6 }}>
            {showCancellationReason
              ? 'Cancellation Reason:'
              : showHoldingReason
              ? 'Reason for Holding:'
              : showIncidentNotes
              ? 'Incident Notes:'
              : 'Confirmation Notes:'}
          </label>
          <TextArea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              showCancellationReason
                ? 'Please provide a reason for cancellation.'
                : showHoldingReason
                ? 'Add any relevant notes about the class being held.'
                : showIncidentNotes
                ? 'Add notes about what happened during the class.'
                : 'Add any confirmation notes.'
            }
            maxLength={500}
            showCounter={true}
            disabled={loading}
          />
        </>
      )}

      {error && (
        <p
          role="alert"
          style={{ color: 'red', marginBottom: 16, fontWeight: 'bold' }}>
          {error}
        </p>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handleSubmit}
          disabled={
            loading ||
            !isValidDate ||
            !isValidTime ||
            !isValidMessage ||
            showPendingApprovalNote
          }
          style={{
            flexGrow: 1,
            marginRight: 8,
            padding: '0.75rem',
            backgroundColor:
              loading ||
              !isValidDate ||
              !isValidTime ||
              !isValidMessage ||
              showPendingApprovalNote
                ? '#999'
                : '#25aff3',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: 6,
            cursor:
              loading ||
              !isValidDate ||
              !isValidTime ||
              !isValidMessage ||
              showPendingApprovalNote
                ? 'not-allowed'
                : 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          aria-disabled={
            loading ||
            !isValidDate ||
            !isValidTime ||
            !isValidMessage ||
            showPendingApprovalNote
          }
          title={
            !isValidDate
              ? 'Please select a valid date'
              : !isValidTime
              ? 'Start time must be before or equal to end time'
              : !isValidMessage
              ? 'Please provide a cancellation reason'
              : showPendingApprovalNote
              ? 'Editing disabled while pending approval'
              : ''
          }>
          {loading ? 'Updating...' : 'Update Status'}
        </button>

        <button
          onClick={handleReset}
          type="button"
          disabled={loading}
          style={{
            flexGrow: 1,
            marginLeft: 8,
            padding: '0.75rem',
            backgroundColor: '#ccc',
            color: '#333',
            border: 'none',
            borderRadius: 6,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}>
          Reset
        </button>
      </div>
    </div>
  );
}
