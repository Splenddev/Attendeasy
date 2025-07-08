import React from 'react';
import {
  FaFolderOpen,
  FaFilePdf,
  FaFileVideo,
  FaFileAlt,
  FaUpload,
} from 'react-icons/fa';
import styles from './GroupCloudTab.module.css'; // use CSS modules

const fileSummary = [
  {
    type: 'Documents',
    count: 118,
    size: '4.6 MB',
    icon: <FaFilePdf color="#d9534f" />,
  },
  {
    type: 'Videos',
    count: 5,
    size: '19.2 MB',
    icon: <FaFileVideo color="#5bc0de" />,
  },
  {
    type: 'Audio',
    count: 0,
    size: '0 MB',
    icon: <FaFileAlt color="#f0ad4e" />,
  },
  {
    type: 'Images',
    count: 0,
    size: '0 MB',
    icon: <FaFileAlt color="#5cb85c" />,
  },
];

const GroupCloudTab = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Group Cloud</h2>
        <p>All files (8 total)</p>
      </header>

      <div className={styles.grid}>
        {fileSummary.map((item) => (
          <div
            key={item.type}
            className={styles.card}>
            <div className={styles.icon}>{item.icon}</div>
            <div className={styles.content}>
              <strong>{item.type}</strong>
              <p>{item.count} files</p>
              <p>{item.size} used</p>
            </div>
          </div>
        ))}

        <div className={styles.uploadCard}>
          <FaUpload size={24} />
          <p>Upload or drag and drop</p>
          <button>Choose File</button>
        </div>
      </div>

      <section className={styles.bottomSection}>
        <div className={styles.recentActivity}>
          <h3>Recent Activity</h3>
          <div className={styles.activityItem}>
            <FaFilePdf className={styles.pdfIcon} />
            <span>You viewed a new file: Biochemistry.pdf</span>
            <small>2025-07-08 at 16:15</small>
          </div>
          <div className={styles.activityItem}>
            <FaFileVideo className={styles.videoIcon} />
            <span>Musa submitted a video</span>
            <small>2025-07-07 at 15:30</small>
            <div className={styles.actionButtons}>
              <button className={styles.approve}>Approve</button>
              <button className={styles.reject}>Reject</button>
            </div>
          </div>
        </div>

        <div className={styles.storageBox}>
          <h4>My Storage</h4>
          <div className={styles.storageRing}>
            <svg
              width="100"
              height="100"
              viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#ddd"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 80"
                fill="none"
                stroke="#25aff3"
                strokeWidth="2"
                strokeDasharray="86, 100"
              />
            </svg>
            <div className={styles.usedLabel}>86.12 MB</div>
          </div>
          <ul className={styles.usageBreakdown}>
            <li>
              <span
                className={styles.dot}
                style={{ backgroundColor: '#d9534f' }}></span>{' '}
              Documents (4.6MB)
            </li>
            <li>
              <span
                className={styles.dot}
                style={{ backgroundColor: '#5bc0de' }}></span>{' '}
              Videos (19.2MB)
            </li>
            <li>
              <span
                className={styles.dot}
                style={{ backgroundColor: '#f0ad4e' }}></span>{' '}
              Audio (0MB)
            </li>
            <li>
              <span
                className={styles.dot}
                style={{ backgroundColor: '#5cb85c' }}></span>{' '}
              Images (0MB)
            </li>
          </ul>
          <small>Total Storage: 50MB</small>
        </div>
      </section>
    </div>
  );
};

export default GroupCloudTab;
