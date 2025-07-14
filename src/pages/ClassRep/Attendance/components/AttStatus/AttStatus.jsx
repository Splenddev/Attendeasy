import {
  MdAccessTime,
  MdCheckCircle,
  MdCancel,
  MdSchedule,
} from 'react-icons/md';

import './AttStatus.css';

const statusMap = {
  active: {
    label: 'Active Now',
    icon: <MdCheckCircle size={18} />,
    className: 'active',
  },
  closed: {
    label: 'Closed',
    icon: <MdCancel size={18} />,
    className: 'closed',
  },
  upcoming: {
    label: 'Upcoming',
    icon: <MdSchedule size={18} />,
    className: 'upcoming',
  },
  finalizing: {
    label: 'Finalizing',
    icon: <MdAccessTime size={18} />,
    className: 'finalizing',
  },
};

const AttStatus = ({ status }) => {
  const current = statusMap[status] || { label: status, className: '' };

  return (
    <div className={`att-status-badge ${current.className} center`}>
      {current.icon}
      <span>{current.label}</span>
    </div>
  );
};
export default AttStatus;
