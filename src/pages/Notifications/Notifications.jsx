import './Nofications.css';

const notifications = [
  {
    avatar: 'https://via.placeholder.com/32',
    user: 'Jessie Joee',
    action: 'comment',
    target: 'Facebook Campaign [In Progress]',
    time: '12 minutes ago',
  },
  {
    avatar: 'https://via.placeholder.com/32',
    user: 'Teo Le',
    action: 'added file',
    target: 'WhatsApp Ads Campaign [Active]',
    time: '44 minutes ago',
    file: {
      name: 'LezatikaFoods_MarketingAssets_Sept2024.zip',
      size: '3.1 MB',
    },
  },
  {
    avatar: 'https://via.placeholder.com/32',
    user: 'Sarah',
    action: 'requested access to Instagram Ads for Lezatos',
    time: '56 minutes ago',
    approval: true,
  },
  {
    avatar: 'https://via.placeholder.com/32',
    user: 'Ekakuma',
    action: 'added file',
    target: 'Tiktok Shop Campaign [Draft]',
    time: '1 hour ago',
    file: {
      name: 'FrozenDelights_CampaignReport_Sept2024.pdf',
      size: '1.31 MB',
    },
  },
  {
    avatar: 'https://via.placeholder.com/32',
    user: 'Gyio',
    action: 'mentioned you in',
    target: 'Facebook Campaign [In Progress]',
    time: '1 hour ago',
  },
  {
    avatar: 'https://via.placeholder.com/32',
    user: 'Tode Boru',
    action: 'completed',
    target: 'LinkedIn Campaign [Active]',
    time: '2 hours ago',
  },
  {
    avatar: 'https://via.placeholder.com/32',
    user: 'Marya Livyd',
    action: 'added file',
    target: 'Tiktok Shop Campaign [Draft]',
    time: '2 hours ago',
    file: { name: 'BekuNikmat_AdCampaignAssets_Sept2024.pdf', size: '1.31 MB' },
  },
  {
    avatar: 'https://via.placeholder.com/32',
    user: 'Fleming Roberto',
    action: 'mentioned you in',
    target: 'Facebook Campaign [Draft]',
    time: '2 hours ago',
  },
];

const Notifications = () => {
  return (
    <div className="notification-container">
      <div className="notification-header">
        <h3>Notification</h3>
        <div className="tabs">
          <button className="tab active">View All</button>
          <button className="tab">Mentions</button>
          <button className="tab">Archive</button>
        </div>
      </div>
      <div className="notification-list">
        {notifications.map((n, i) => (
          <div
            key={i}
            className="notification-item">
            <div className="avatar">
              <span className="dot" />
              <img
                src={n.avatar}
                alt="avatar"
              />
            </div>
            <div className="notification-content">
              <p>
                <strong>{n.user}</strong> {n.action}{' '}
                {n.target && <span className="highlight">{n.target}</span>}
              </p>
              <span className="time">{n.time}</span>
              {n.file && (
                <div className="file-box">
                  <p>{n.file.name}</p>
                  <span>{n.file.size}</span>
                </div>
              )}
              {n.approval && (
                <div className="buttons">
                  <button className="deny">Deny</button>
                  <button className="approve">Approve</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
