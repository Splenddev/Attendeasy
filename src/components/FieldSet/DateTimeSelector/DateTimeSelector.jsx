// DateTimeSelector.jsx
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MdCheckCircle, MdOutlineCheckCircleOutline } from 'react-icons/md';
import './DateTimeSelector.css';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const DateTimeSelector = ({ name }) => {
  const { control, watch, setValue } = useFormContext();
  const fieldArray = useFieldArray({ control, name });
  const selectedDays = watch(name) || [];

  // Check if a day is already selected
  const isDaySelected = (day) =>
    selectedDays.some((entry) => entry.day === day);

  // Get start and end time for a day
  const getTiming = (day) =>
    selectedDays.find((entry) => entry.day === day)?.timing || {
      startTime: '',
      endTime: '',
    };

  // Toggle day ON/OFF
  const toggleDay = (day) => {
    const existingIndex = selectedDays.findIndex((entry) => entry.day === day);

    if (existingIndex !== -1) {
      // remove by index
      fieldArray.remove(existingIndex);
    } else {
      // append new
      fieldArray.append({
        day,
        timing: { startTime: '', endTime: '' },
      });
    }
  };

  const updateTime = (day, field, value) => {
    const index = selectedDays.findIndex((entry) => entry.day === day);
    if (index === -1) return;

    const updated = [...selectedDays];
    updated[index] = {
      ...updated[index],
      timing: {
        ...updated[index].timing,
        [field]: value,
      },
    };
    setValue(name, updated, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="day-time-selector">
      {daysOfWeek.map((day) => {
        const selected = isDaySelected(day);
        const timing = getTiming(day);

        return (
          <div
            key={day}
            className="day-block">
            <div
              className="day-label"
              onClick={() => toggleDay(day)}>
              {selected ? <MdCheckCircle /> : <MdOutlineCheckCircleOutline />}
              <span>{day}</span>
            </div>

            {selected && (
              <div className="time-inputs">
                <input
                  type="time"
                  value={timing.startTime}
                  onChange={(e) => updateTime(day, 'startTime', e.target.value)}
                  required
                />
                <input
                  type="time"
                  value={timing.endTime}
                  onChange={(e) => updateTime(day, 'endTime', e.target.value)}
                  required
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DateTimeSelector;
