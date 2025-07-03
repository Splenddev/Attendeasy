import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import styles from './ScheduleSelector.module.css';
import useSchedules from '../../../../../hooks/useSchedules';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../../../components/Loader/Spinner/Spinner';
import { catenateCredentialsSecure } from '../../../../../utils/helpers';

const ScheduleSelector = () => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const navigate = useNavigate();

  const { schedules, loading, error, retry } = useSchedules();
  const selectedScheduleId = useWatch({ name: 'scheduleId' });
  const selectedClassDay = useWatch({ name: 'classTime.day' });
  const selectedStartTime = useWatch({ name: 'classTime.start' });

  const selectedSchedule = Array.isArray(schedules)
    ? schedules.find((s) => s._id === selectedScheduleId)
    : null;

  useEffect(() => {
    if (selectedSchedule) {
      setValue('lecturer.name', selectedSchedule.lecturerName || '');
      setValue('lecturer.email', selectedSchedule.lecturerEmail || '');
      setValue('groupId', selectedSchedule.groupId || '');
    }
  }, [selectedSchedule, setValue]);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        Select Schedule <span className={styles.required}>*</span>
      </label>

      {loading ? (
        <div className={styles.info}>
          <Spinner
            borderWidth="1px"
            size="15px"
          />
          Loading schedules…
        </div>
      ) : error ? (
        <div className={styles.errorBox}>
          <p className={styles.error}>{error}</p>
          <button
            onClick={retry}
            className={styles.retryButton}>
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className={styles.cardGrid}>
            {schedules.map((sch) => {
              const isSelected = selectedScheduleId === sch._id;
              return (
                <div
                  key={sch._id}
                  className={`${styles.card} ${styles.scheduleCard} ${
                    isSelected ? styles.selected : ''
                  }`}
                  onClick={() => {
                    setValue('scheduleId', sch._id);
                    setValue('classTime.day', '');
                    setValue('classTime.start', '');
                    setValue('classTime.end', '');
                    setValue('groupId', sch.groupId);
                  }}>
                  <h3>{sch.courseTitle}</h3>
                  <p>{sch.courseCode}</p>
                  <p>{sch.classroomVenue}</p>
                  <p>
                    <strong>Lecturer:</strong> {sch.lecturerName}
                  </p>
                  <p>
                    <strong>Group Id:</strong>{' '}
                    {catenateCredentialsSecure([sch.groupId], {
                      maxLength: 10,
                      obfuscate: true,
                    })}
                  </p>
                </div>
              );
            })}
          </div>

          {errors.scheduleId && (
            <small className={styles.error}>{errors.scheduleId.message}</small>
          )}

          {selectedSchedule?.classDaysTimes?.length > 0 && (
            <>
              <p className={styles.label}>Choose Class Day & Time</p>
              <div className={styles.cardGrid}>
                {selectedSchedule.classDaysTimes.map((slot, index) => {
                  const isSelected =
                    selectedClassDay === slot.day &&
                    selectedStartTime === slot.timing.startTime;

                  return (
                    <div
                      key={index}
                      className={`${styles.card} ${styles.dayTimeCard} ${
                        isSelected ? styles.selected : ''
                      }`}
                      onClick={() => {
                        setValue('classTime.day', slot.day);
                        setValue('classTime.start', slot.timing.startTime);
                        setValue('classTime.end', slot.timing.endTime);
                      }}>
                      <h4>{slot.day}</h4>
                      <p>
                        {slot.timing.startTime} – {slot.timing.endTime}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {Array.isArray(schedules) && schedules.length === 0 && (
            <p className={styles.warning}>
              No schedules found for your group. Please create one.
            </p>
          )}

          <div className={styles.linkRow}>
            <button
              type="button"
              onClick={() => navigate('/class-rep/schedules/create')}
              className={styles.linkButton}>
              + Create New Schedule
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ScheduleSelector;
