import { useState } from 'react';
import {
  FiCalendar,
  FiBook,
  FiVideo,
  FiInfo,
  FiTrash2,
  FiPlusCircle,
  FiPenTool,
  FiEye,
} from 'react-icons/fi';
import { format } from 'date-fns';
import './AnnouncementsTab.css';

const typeIcons = {
  class: <FiCalendar />,
  assignment: <FiBook />,
  media: <FiVideo />,
  general: <FiInfo />,
};

const typeLabels = {
  class: 'Class',
  assignment: 'Assignment',
  media: 'Media',
  general: 'General',
};

const AnnouncementsTab = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Midterm Review Class',
      body: 'There will be a special review session this Friday covering all topics from weeks 1–6. Attendance is highly recommended.',
      postedAt: '2025-06-10T14:30:00Z',
      type: 'class',
    },
    {
      id: 2,
      title: 'Assignment 2 Deadline',
      body: 'Submit your second assignment on Linked Lists by Sunday night. Late submissions will incur penalties.',
      postedAt: '2025-06-11T10:00:00Z',
      type: 'assignment',
    },
    {
      id: 3,
      title: 'Media Upload Notice',
      body: 'Lecture recording for Week 5 has been uploaded. Access it from the materials section.',
      postedAt: '2025-06-09T16:45:00Z',
      type: 'media',
    },
    {
      id: 4,
      title: 'No Class Next Monday',
      body: 'Due to a public holiday, there will be no class next Monday. Use the time to revise.',
      postedAt: '2025-06-08T12:00:00Z',
      type: 'general',
    },
  ]);

  const handleDelete = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const types = ['general', 'media', 'assignment', 'class'];

  const handleAdd = () => {
    // Replace with form/modal logic
    const newAnnouncement = {
      id: Date.now(),
      title: 'New Example Announcement',
      body: 'This is an example announcement body.',
      postedAt: new Date().toISOString(),
      type: types[Math.floor(Math.random() * types.length)],
    };
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  };

  return (
    <div className="announcements-tab">
      <div className="announcements-header">
        <h2>Announcements</h2>
        <button
          onClick={handleAdd}
          className="add-btn">
          <FiPlusCircle /> Add
        </button>
      </div>

      {Object.entries(
        announcements.reduce((acc, ann) => {
          acc[ann.type] = [...(acc[ann.type] || []), ann];
          return acc;
        }, {})
      ).map(([type, items]) => (
        <div
          key={type}
          className="announcement-category">
          <h3 className="category-title">
            {typeIcons[type]} {typeLabels[type]} Announcements
          </h3>
          {items.map((announcement) => (
            <div
              key={announcement.id}
              className="announcement-card">
              <div className="card-header">
                <h4>{announcement.title}</h4>
                <span className="timestamp">
                  {format(new Date(announcement.postedAt), 'PPP p')}
                </span>
              </div>
              <p>{announcement.body}</p>
              <div className="card-actions">
                <button onClick={() => alert(announcement.body)}>
                  <FiEye />
                  View
                </button>
                <button onClick={() => handleDelete(announcement.id)}>
                  <FiTrash2 /> Delete
                </button>
                <button>
                  <FiPenTool /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnnouncementsTab;
