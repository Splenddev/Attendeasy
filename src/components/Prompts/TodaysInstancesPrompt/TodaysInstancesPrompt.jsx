import React from 'react';
import { useLocation } from 'react-router-dom';

export default function TodaysInstancesPrompt({
  instances,
  promptMessage,
  onConfirm,
}) {
  const location = useLocation();
  const pathParts = location.pathname.split('/');

  if (
    !instances ||
    instances.length === 0 ||
    (pathParts.includes('schedules') && pathParts.includes('history'))
  ) {
    return null;
  }

  return (
    <div
      style={{ padding: '1rem', background: '#eef6ff', borderRadius: '8px' }}>
      <p>{promptMessage}</p>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {instances.map((instance) => (
          <li
            key={instance._id}
            style={{
              marginBottom: '1rem',
              borderBottom: '1px solid #ccc',
              paddingBottom: '0.5rem',
            }}>
            <strong>Class Date:</strong>{' '}
            {new Date(instance.classDate).toLocaleDateString()}
            <br />
            <strong>Status:</strong> {instance.classStatus}
            <br />
            <strong>Schedule:</strong>{' '}
            {instance.scheduleId?._id || 'Unnamed Schedule'}
            <br />
            {/* Add more instance info here */}
            <button
              onClick={() => onConfirm(instance.scheduleId?._id)}
              style={{ marginTop: '0.5rem', cursor: 'pointer' }}>
              Confirm Status
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
