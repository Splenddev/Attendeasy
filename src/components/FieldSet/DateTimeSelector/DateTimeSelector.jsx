import './DateTimeSelector.css';
import { MdCheckCircle, MdOutlineCheckCircleOutline } from 'react-icons/md';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const DateTimeSelector = ({ name, watch, setValue }) => {
  const selectedDays = watch(name) || [];

  const toggleDay = (day) => {
    const updated = [...selectedDays];
    const index = updated.findIndex((d) => d.day === day);

    if (index !== -1) {
      updated.splice(index, 1);
    } else {
      updated.push({ day, timing: { start: '', end: '' } });
    }

    setValue(name, updated);
  };

  const updateTime = (day, field, value) => {
    const updated = [...selectedDays];
    const index = updated.findIndex((d) => d.day === day);
    if (index === -1) return;

    updated[index] = {
      ...updated[index],
      timing: {
        ...updated[index].timing,
        [field]: value,
      },
    };

    setValue(name, updated);
  };

  const isDaySelected = (day) => selectedDays.some((d) => d.day === day);

  const getTimingForDay = (day) =>
    selectedDays.find((d) => d.day === day)?.timing || { start: '', end: '' };

  return (
    <div className="day-time-selector">
      {daysOfWeek.map((day) => {
        const selected = isDaySelected(day);
        const timing = getTimingForDay(day);

        return (
          <div
            className="day-block"
            key={day}>
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
                  value={timing.start}
                  onChange={(e) => updateTime(day, 'start', e.target.value)}
                  placeholder="Start Time"
                  required
                />
                <input
                  type="time"
                  value={timing.end}
                  onChange={(e) => updateTime(day, 'end', e.target.value)}
                  placeholder="End Time"
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
