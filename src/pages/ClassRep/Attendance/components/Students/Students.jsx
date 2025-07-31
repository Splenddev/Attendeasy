import React, { useState } from 'react';
import { parseUserAgent, timeFormatter } from '../../../../../utils/helpers';
import {
  FaCrown,
  FaUserGraduate,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaTimesCircle,
  FaTimes,
  FaCheckCircle,
  FaGlobe,
  FaClock,
  FaDesktop,
} from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { MdFlag } from 'react-icons/md';
import './Students.css';
import useDisableScroll from '../../../../../hooks/useDisableScroll';
import './DeviceInfoCard.css';
import { format } from 'date-fns';

const statusToLetterMap = {
  excused: 'X',
  on_time: 'P',
  present: 'P',
  late: 'L',
  late_left_early: 'R',
  left_early: 'E',
  not_checkout: 'N',
  not_checkin: 'M',
  partial: 'R',
  absent: 'A',
};
const finalStatusLetter = (status) => {
  return statusToLetterMap[status] || 'A';
};

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
    deviceInfo,
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
          <li>
            <strong>Device Info:</strong>
            <DeviceInfoCard deviceInfo={deviceInfo} />
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

const DeviceInfoCard = ({ deviceInfo }) => {
  if (!deviceInfo) return null;

  const { userAgent, markedAt } = deviceInfo;
  const ip = deviceInfo.ip === '::1' ? 'This Device' : deviceInfo.ip;
  const { os, browser } = parseUserAgent(userAgent);

  return (
    <div className="device-card">
      <div className="device-row">
        <FaGlobe className="icon" />
        <div>
          <div className="label">IP Address</div>
          <div className="value">{ip || 'Unavailable'}</div>
        </div>
      </div>

      <div className="device-row">
        <FaDesktop className="icon" />
        <div>
          <div className="label">Device</div>
          <div className="value">
            {os} – {browser}
          </div>
        </div>
      </div>

      <div className="device-row">
        <FaClock className="icon" />
        <div>
          <div className="label">Marked At</div>
          <div className="value">
            {markedAt ? format(new Date(markedAt), 'PPpp') : 'Not recorded'}
          </div>
        </div>
      </div>
    </div>
  );
};

const Students = ({ group, view, att }) => {
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
                    {st.role === 'class-rep' ? <FaCrown /> : <FaUserGraduate />}
                  </span>
                </div>
                <p className="name">{st.name}</p>
              </div>

              <div className={`marks ${view}`}>
                {view === 'grid'
                  ? (att.settings.markingConfig.type === 'strict'
                      ? ['present', 'absent', 'partial']
                      : [
                          'on_time',
                          'absent',
                          'late',
                          'left_early',
                          'excused',
                          'pending',
                          'partial',
                          'present',
                        ]
                    ).map((type) => {
                      const isActive = st.finalStatus === type;
                      const statusClass = {
                        on_time: 'present',
                        present: 'present',
                        late: 'late',
                        absent: 'absent',
                        left_early: 'left_early',
                        excused: 'excused',
                        partial: 'partial',
                        pending: 'pending',
                      }[type];

                      return (
                        <div
                          key={type}
                          className={`mark ${view} ${
                            isActive ? statusClass : ''
                          }`}>
                          {finalStatusLetter(type)}
                        </div>
                      );
                    })
                  : (() => {
                      const isStrict =
                        att.settings.markingConfig.type === 'strict';

                      const allowedStrict = ['present', 'absent', 'partial'];

                      if (isStrict && !allowedStrict.includes(st.finalStatus))
                        return null;

                      const statusClass = {
                        on_time: 'present',
                        present: 'present',
                        late: 'late',
                        absent: 'absent',
                        left_early: 'left_early',
                        excused: 'excused',
                        partial: 'partial',
                        pending: 'pending',
                      }[st.finalStatus];

                      return (
                        <div className={`mark ${view} ${statusClass}`}>
                          {finalStatusLetter(st.finalStatus)}
                        </div>
                      );
                    })()}
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
                onClick={() => {
                  console.log(st);
                  openModal(st);
                }}>
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
