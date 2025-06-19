import { routesNavigate } from '../../../../utils/helpers';
import { MdGroups } from 'react-icons/md';

const GroupPreview = ({ data, bannerUrl, role, disabled, isMobile }) => {
  const {
    groupName = 'Unnamed Group',
    course = 'Course not specified',
    description = 'No description provided.',
    department = 'Unknown Department',
    faculty = 'Unknown Faculty',
    level = 'N/A',
    schedule = [],
  } = data;

  return (
    <div className={`group-preview ${isMobile ? 'mobile' : ''}`}>
      <div className="group-preview-banner">
        {bannerUrl ? (
          <img
            src={bannerUrl || '/vigilo_logo.jpeg'}
            alt="Group Banner"
            className="group-banner-img"
          />
        ) : (
          <MdGroups
            size={140}
            color="grey"
          />
        )}
      </div>

      <div className="group-preview-body">
        <h3 className="group-name">{groupName || 'Unnamed Group'}</h3>
        <p className="group-course">{course}</p>
        <p className="group-description">{description}</p>

        <div className="group-preview-meta">
          <div>
            <b>Faculty</b>
            <span>{faculty}</span>
          </div>
          <div>
            <b>Department</b>
            <span>{department}</span>
          </div>
          <div>
            <b>Level</b>
            <span>{level}</span>
          </div>
        </div>

        {schedule?.length > 0 && (
          <div className="group-preview-schedule">
            <h4>Sample Schedule</h4>
            <ul>
              {schedule.slice(0, 3).map((entry, i) => (
                <li key={i}>
                  <strong>{entry.day}</strong>: {entry.timing?.startTime} -{' '}
                  {entry.timing?.endTime}
                </li>
              ))}
              {schedule.length > 3 && <li>...and more</li>}
            </ul>
          </div>
        )}

        <button
          onClick={() => routesNavigate(`/${role}/group-management`)}
          className={`group-reg-finish-btn ${disabled && 'disabled-btn'}`}
          disabled={disabled}>
          Proceed to Group
        </button>
      </div>
    </div>
  );
};

export default GroupPreview;
