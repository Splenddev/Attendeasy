// FileList.js
import { useState } from 'react';
import {
  FaThLarge,
  FaList,
  FaUser,
  FaCommentDots,
  FaFileAlt,
} from 'react-icons/fa';
import styles from './FileList.module.css';

import { LuDownload, LuTrash, LuEye, LuShare2, LuCopy } from 'react-icons/lu';
import MoreOptions from '../../../../features/MoreOptions/MoreOptions';
import { FiEdit3 } from 'react-icons/fi';

const fileMoreMenuData = [
  {
    id: 'open',
    label: 'Open',
    icon: <LuEye />,
    for: null, // visible to all users
  },
  {
    id: 'rename',
    label: 'Rename',
    icon: <FiEdit3 />,
    for: 'editor', // only editors/admins
  },
  {
    id: 'download',
    label: 'Download',
    icon: <LuDownload />,
    for: null,
  },
  {
    id: 'share',
    label: 'Share',
    icon: <LuShare2 />,
    for: null,
  },
  {
    id: 'duplicate',
    label: 'Make a Copy',
    icon: <LuCopy />,
    for: 'editor',
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <LuTrash />,
    style: { color: 'var(--red)' },
    for: 'editor',
  },
];

const FileList = ({ files, defaultView = 'grid', user }) => {
  const [viewMode, setViewMode] = useState(defaultView);
  var [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={styles.container}>
      {/* Header / Controls */}
      <div className={styles.header}>
        <h2>Recent Files</h2>
        <div className={styles.viewToggle}>
          <button
            className={viewMode === 'grid' ? styles.active : ''}
            onClick={() => setViewMode('grid')}
            title="Grid View">
            <FaThLarge />
          </button>
          <button
            className={viewMode === 'list' ? styles.active : ''}
            onClick={() => setViewMode('list')}
            title="List View">
            <FaList />
          </button>
        </div>
      </div>

      {/* Files */}
      <div className={viewMode === 'grid' ? styles.grid : styles.list}>
        {files.map((file, index) => (
          <div
            key={index}
            className={styles.fileCard}>
            <div className={styles.fileHeader}>
              <FaFileAlt className={styles.fileIcon} />
              <div>
                <b>{file.filename}</b>
              </div>
            </div>

            <p className={styles.meta}>
              {viewMode === 'grid' && 'Uploaded:'}{' '}
              {new Date(file.dateUploaded).toLocaleDateString()}
            </p>
            <p className={styles.meta}>
              {viewMode === 'grid' && 'Updated:'}{' '}
              {new Date(file.lastUpdated).toLocaleDateString()}
            </p>

            <p className={styles.size}>
              {viewMode === 'grid' && 'Size:'} {file.size}
            </p>

            <p>
              {viewMode === 'grid' && 'Owner:'} {file.fileOwner}
            </p>

            <MoreOptions
              menuData={fileMoreMenuData}
              user={user}
              cardId={index}
              setShowDropdown={setShowDropdown}
              showDropdown={showDropdown}
            />

            {/* Comments */}
            {/* {file.comments.length > 0 && (
              <div className={styles.comments}>
                <h4>
                  <FaCommentDots /> Comments
                </h4>
                <ul>
                  {file.comments.map((c, i) => (
                    <li key={i}>
                      <FaUser /> <strong>{c.user}</strong>: {c.text}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
