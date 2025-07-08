import styles from './GroupCloudTab.module.css';
import {
  FaFileAlt,
  FaFileVideo,
  FaMusic,
  FaCloudUploadAlt,
  FaSearch,
  FaEllipsisV,
} from 'react-icons/fa';

const files = [
  {
    name: 'Berserk Vol 32.pdf',
    size: '25 MB',
    date: '2025/8/16',
    type: 'pdf',
    users: ['+3'],
  },
  {
    name: 'Invoice Dec 23.doc',
    size: '44 GB',
    date: '2025/8/16',
    type: 'doc',
    users: ['+5'],
  },
  {
    name: 'Screenshot 22.jpg',
    size: '78 TB',
    date: '2025/8/16',
    type: 'img',
    users: ['+2'],
  },
];

const GroupCloudTab = () => {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Group Cloud</h2>
        <div className={styles.views}>
          <button className={styles.active}>Normal View</button>
          <button>List View</button>
          <button>Card View</button>
        </div>
      </div>

      <div className={styles.content}>
        {/* Left Column */}
        <div className={styles.main}>
          {/* Folder Summary Cards */}
          <div className={styles.folders}>
            <div className={styles.folderCard}>
              <FaFileAlt />
              <div>
                <h4>Files</h4>
                <p>118 files – 2.8 GB</p>
              </div>
            </div>
            <div className={styles.folderCard}>
              <FaFileVideo />
              <div>
                <h4>Videos</h4>
                <p>16 files – 128.1 TB</p>
              </div>
            </div>
            <div className={styles.folderCard}>
              <FaMusic />
              <div>
                <h4>Audio</h4>
                <p>1,228 files – 155 MB</p>
              </div>
            </div>
          </div>

          {/* Upload Box */}
          <div className={styles.uploadBox}>
            <FaCloudUploadAlt size={40} />
            <p>Click here to upload your file or drag.</p>
            <small>Supported formats: SVG, JPG, PNG (10MB max)</small>
          </div>

          {/* Files Table */}
          <div className={styles.filesSection}>
            <div className={styles.filesHeader}>
              <h4>
                My Files <span>({files.length} Total)</span>
              </h4>
              <div className={styles.fileSearch}>
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search files"
                />
              </div>
              <button className={styles.filterBtn}>Filter</button>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Size</th>
                  <th>Last Modified</th>
                  <th>User Permission</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, idx) => (
                  <tr key={idx}>
                    <td>{file.name}</td>
                    <td>{file.size}</td>
                    <td>{file.date}</td>
                    <td>{file.users.join(', ')}</td>
                    <td>
                      <FaEllipsisV />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className={styles.sidebar}>
          <h3>My Storage</h3>
          <div className={styles.chart}>
            <svg
              width="100"
              height="100"
              viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="#eee"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="#25aff3"
                strokeWidth="3"
                strokeDasharray="70, 100"
                transform="rotate(-90 18 18)"
              />
            </svg>
            <span className={styles.usageText}>36.12 MB</span>
          </div>

          <ul className={styles.breakdown}>
            <li>
              <span style={{ background: '#d9534f' }}></span> Documents (4.6MB)
            </li>
            <li>
              <span style={{ background: '#5bc0de' }}></span> Videos (19.2MB)
            </li>
            <li>
              <span style={{ background: '#333' }}></span> Audio (0MB)
            </li>
          </ul>

          <small>Total Storage: 50MB</small>

          <div className={styles.recent}>
            <h4>Recent Activity</h4>
            <ul>
              <li>Uploaded 2 files – July 8</li>
              <li>Deleted 1 file – July 7</li>
              <li>Viewed a file – July 6</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default GroupCloudTab;
