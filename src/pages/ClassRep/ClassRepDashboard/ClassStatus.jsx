import { FaClock, FaHourglassHalf } from 'react-icons/fa';
import { MdBlock } from 'react-icons/md';

const ClassStatus = ({ status }) => {
  const statusIcons = {
    'not-started': { icon: <FaClock />, text: 'Not Yet Time' },
    'in-progress': { icon: <FaHourglassHalf />, text: 'In Progress' },
    ended: { icon: <MdBlock />, text: 'Ended' },
  };

  return (
    <div className={`class-status ${status}`}>
      {statusIcons[status]?.icon}
      <p>{statusIcons[status]?.text}</p>
    </div>
  );
};

export default ClassStatus;
