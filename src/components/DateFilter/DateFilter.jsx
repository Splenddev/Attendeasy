import { useEffect, useState } from 'react';
import { addDays, format, parseISO, subDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import button from '../Button/Button';
import './DateFilter.css';

const DateFilter = ({ setFilteredAttendance, attendanceList }) => {
  const [currDate, setCurrDate] = useState(new Date());

  const minDate = new Date(2025, 0, 1);
  const maxDate = new Date(2030, 11, 31);

  const filterData = () => {
    const filtered = attendanceList.filter((item) => {
      if (!item.DateCreated) return false; // skip if no time property
      try {
        const itemDate = parseISO(item.DateCreated);
        return itemDate.toDateString() === currDate.toDateString();
      } catch {
        return false; // skip if parseISO fails
      }
    });
    setFilteredAttendance(filtered);
  };


  useEffect(() => {
    filterData();
  }, [currDate, attendanceList]); // Added attendanceList to deps in case it changes

  const handleDateChange = (date) => {
    if (date >= minDate && date <= maxDate) {
      setCurrDate(date);
    }
  };

  const handlePrev = () => {
    const newDate = subDays(currDate, 1);
    if (newDate >= minDate) {
      setCurrDate(newDate);
    } else {
      alert('Minimum date reached');
    }
  };

  const handleNext = () => {
    const newDate = addDays(currDate, 1);
    if (newDate <= maxDate) {
      setCurrDate(newDate);
    } else {
      alert('Maximum date reached');
    }
  };

  const isPrevDisabled = subDays(currDate, 1) < minDate;
  const isNextDisabled = addDays(currDate, 1) > maxDate;

  return (
    <div className="dateFilter">
      <div className="date-filter-nav">
        {button.icon({
          icon: FaAngleLeft,
          func: handlePrev,
          label: 'Previous Date',
          name: `date-nav ${isPrevDisabled ? 'disabled' : ''}`,
          disabled: isPrevDisabled, // added disabled prop if your button supports it
        })}

        <div className="custom-date-input">
          <DatePicker
            selected={currDate}
            onChange={handleDateChange}
            minDate={minDate}
            maxDate={maxDate}
            customInput={
              <input
                value={format(currDate, 'yyyy-MM-dd')}
                readOnly
              />
            }
          />
        </div>

        {button.icon({
          icon: FaAngleRight,
          func: handleNext,
          label: 'Next Date',
          name: `date-nav ${isNextDisabled ? 'disabled' : ''}`,
          disabled: isNextDisabled, // added disabled prop
        })}
      </div>
    </div>
  );
};

export default DateFilter;
