import React, { useState } from 'react';
import { timeFormatter } from '../../../../../utils/helpers';
import {
  FaCrown,
  FaUserGraduate,
  FaCertificate,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaTimesCircle,
  FaTimes,
  FaCheckCircle,
} from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { MdFlag } from 'react-icons/md';
import './Students.css';
import useDisableScroll from '../../../../../hooks/useDisableScroll';

const finalStatusLetter = (status) =>
  status === 'on_time' || status === 'present'
    ? 'P'
    : status === 'late'
    ? 'L'
    : status === 'left_early'
    ? 'E'
    : status === 'excused'
    ? 'X'
    : status === 'partial'
    ? 'R'
    : 'A';

const MoreInfoModal = ({ isOpen, closed, data }) => {
  useDisableScroll(isOpen);

  if (!isOpen || !data) return null;

  const {
    name,
    finalStatus,
    checkIn,
    checkOut,
    arrivalDeltaMinutes,
    departureDeltaMinutes,
    durationMinutes,
    wasWithinRange,
    checkInVerified,
    markedBy,
    rewardPoints,
    penaltyPoints,
    flagged,
    warningsIssued,
    checkInStatus,
    checkOutStatus,
  } = data;

  const needsCheckout = !checkOut?.time;

  return (
    <div
      className="student-modal-backdrop"
      onClick={closed}>
      <div
        className="student-modal"
        onClick={(e) => e.stopPropagation()}>
        <button
          className="close-btn"
          onClick={closed}>
          <FaTimes />
        </button>
        <h3>{name}'s Attendance Details</h3>
        <ul>
          <li>
            <strong>Final Status:</strong> {finalStatus || 'None'}
          </li>
          <li>
            <strong>Check In Status:</strong> {checkInStatus || 'None'}
          </li>
          <li>
            <strong>Check Out Status:</strong> {checkOutStatus || 'None'}
          </li>
          <li>
            <strong>Arrival Time:</strong>{' '}
            {checkIn?.time ? timeFormatter(checkIn.time) : '—'}
          </li>
          <li>
            <strong>Arrival Delta:</strong>{' '}
            <span
              style={{
                color:
                  arrivalDeltaMinutes > 0
                    ? 'red'
                    : arrivalDeltaMinutes < 0
                    ? 'green'
                    : 'black',
              }}>
              {typeof arrivalDeltaMinutes === 'number'
                ? arrivalDeltaMinutes === 0
                  ? 'On time'
                  : arrivalDeltaMinutes > 0
                  ? `Late by ${arrivalDeltaMinutes} min`
                  : `Early by ${Math.abs(arrivalDeltaMinutes)} min`
                : '?'}
            </span>
          </li>

          <li>
            <strong>Departure Time:</strong>{' '}
            {checkOut?.time ? timeFormatter(checkOut.time) : '—'}
          </li>
          <li>
            <strong>Departure Delta:</strong>

            <span
              style={{
                color:
                  departureDeltaMinutes === 0
                    ? 'green'
                    : departureDeltaMinutes > 0
                    ? 'var(--late)'
                    : 'red',
              }}>
              {typeof departureDeltaMinutes === 'number'
                ? departureDeltaMinutes === 0
                  ? 'On time'
                  : departureDeltaMinutes > 0
                  ? `Stayed ${departureDeltaMinutes} min late`
                  : `Left early by ${Math.abs(departureDeltaMinutes)} min`
                : '?'}
            </span>
          </li>
          <li>
            <strong>Duration:</strong> {durationMinutes || 0} min
          </li>
          <li>
            <strong>Marked By:</strong> {markedBy || 'None'}
          </li>
          <li>
            <strong>Within Range:</strong>{' '}
            {wasWithinRange ? (
              <span className="good">
                <FaCheckCircle /> Yes
              </span>
            ) : (
              <span className="bad">
                <FaTimesCircle /> No
              </span>
            )}
          </li>
          <li>
            <strong>Check-in Verified:</strong>{' '}
            {checkInVerified ? (
              <span className="good">
                <FaCheckCircle /> Verified
              </span>
            ) : (
              <span className="bad">
                <FaTimesCircle /> Not Verified
              </span>
            )}
          </li>
          <li>
            <strong>Check-in Location:</strong>{' '}
            {checkIn?.location ? (
              <span className="aic">
                <FaMapMarkerAlt /> {checkIn.location.latitude.toFixed(4)},
                {checkIn.location.longitude.toFixed(4)} (
                {checkIn.distanceFromClassMeters}m)
              </span>
            ) : (
              <span className="pill warn">No Checkout</span>
            )}
          </li>
          <li>
            <strong>Check-out Location:</strong>{' '}
            {checkOut?.location ? (
              <span className="aic">
                <FaMapMarkerAlt /> {checkOut.location.latitude.toFixed(4)},
                {checkOut.location.longitude.toFixed(4)} (
                {checkOut.distanceFromClassMeters}m)
              </span>
            ) : (
              <span className="pill warn">No Checkout</span>
            )}
          </li>
          <li>
            <strong>Reward Points:</strong> {rewardPoints ?? 0}
          </li>
          <li>
            <strong>Penalty Points:</strong> {penaltyPoints ?? 0}
          </li>
          <li>
            <strong>Warnings Issued:</strong> {warningsIssued ?? 0}
          </li>

          {flagged?.isFlagged && (
            <div className="flagged-box">
              <strong className="aic">
                <FaExclamationTriangle /> Flagged:
              </strong>

              <div>
                <strong>Reasons:</strong>
                <ul className="flagged-reasons-list">
                  {flagged.reasons.map((reason, idx) => (
                    <li key={idx}>
                      <strong>{reason.code}</strong>
                      {reason.note && ` — ${reason.note}`}
                    </li>
                  ))}
                </ul>
              </div>

              {flagged.note && (
                <div>
                  <strong>Note:</strong> {flagged.note}
                </div>
              )}

              <div>
                <strong>By:</strong> {flagged.flaggedBy}
              </div>

              <div>
                <strong>At:</strong> {timeFormatter(flagged.flaggedAt)}
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

const Students = ({ group, view }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const openModal = (student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  return (
    <>
      <div
        key={group.id}
        className={`c-attendance-group ${view}`}>
        {view === 'grid' && group.letter && (
          <div className="letter-header">
            {group.letter} <hr />
          </div>
        )}

        <div className={`c-attendance-students ${view}`}>
          {group.students.map((st) => (
            <div
              key={st.studentId}
              className={`c-attendance-student ${view}`}>
              <div className="student-name">
                <div className="student-img">
                  {st.name
                    ?.split(' ')
                    .map((n) => n?.[0]?.toUpperCase() || '')
                    .join('') || '??'}
                  <span className="role-icon">
                    {st.role === 'rep' ? <FaCrown /> : <FaUserGraduate />}
                  </span>
                </div>
                <p className="name">{st.name}</p>
              </div>

              <div className={`marks ${view}`}>
                {[
                  'on_time',
                  'absent',
                  'late',
                  'left_early',
                  'excused',
                  'pending',
                  'partial',
                  'present',
                ].map((type) => (
                  <div
                    key={type}
                    className={`mark ${
                      st.finalStatus === type
                        ? type === 'on_time' || type === 'present'
                          ? 'present'
                          : type === 'left_early'
                          ? 'left_early'
                          : type === 'absent'
                          ? 'absent'
                          : 'late'
                        : ''
                    } ${view}`}>
                    {finalStatusLetter(type)}
                  </div>
                ))}
              </div>

              <p>
                <span className="label">In: </span>
                {st.checkIn?.time ? timeFormatter(st.checkIn.time) : '--'}
              </p>
              <p>
                <span className="label">Out: </span>
                {st.checkOut?.time ? timeFormatter(st.checkOut.time) : '--'}
              </p>

              <p
                className="aic"
                style={{ cursor: 'pointer' }}
                onClick={() => openModal(st)}>
                <FiMoreVertical />
                {st.flagged?.isFlagged && (
                  <span className="dot">
                    <FaExclamationTriangle color="var(--absent)" />
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <MoreInfoModal
        isOpen={!!selectedStudent}
        closed={closeModal}
        data={selectedStudent}
      />
    </>
  );
};

export default Students;
