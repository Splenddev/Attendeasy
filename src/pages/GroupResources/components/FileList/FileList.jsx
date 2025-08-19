import { useState, useEffect, useRef } from 'react';
import { FaThLarge, FaList, FaUser, FaCommentDots } from 'react-icons/fa';
import styles from './FileList.module.css';
import { LuDownload, LuTrash, LuEye, LuShare2, LuCopy } from 'react-icons/lu';
import MoreOptions from '../../../../features/MoreOptions/MoreOptions';
import { FiEdit3, FiGrid, FiList } from 'react-icons/fi';
import { getFileIconClass } from '../../../Student/StudentSchedules/components/utils';
import useGsap from '../../../../hooks/useGsap';
import ViewChanger from '../../../../components/ViewChanger/ViewChanger';

const fileMoreMenuData = [
  { id: 'open', label: 'Open', icon: <LuEye /> },
  { id: 'rename', label: 'Rename', icon: <FiEdit3 />, for: 'editor' },
  { id: 'download', label: 'Download', icon: <LuDownload /> },
  { id: 'share', label: 'Share', icon: <LuShare2 /> },
  { id: 'duplicate', label: 'Make a Copy', icon: <LuCopy />, for: 'editor' },
  {
    id: 'delete',
    label: 'Delete',
    icon: <LuTrash />,
    style: { color: 'var(--red)' },
    for: 'editor',
  },
];

const FileList = ({ files = [], defaultView = 'grid', user }) => {
  const [viewMode, setViewMode] = useState(defaultView);
  const [showDropdown, setShowDropdown] = useState(false);
  const fileRefs = useRef([]);

  const filesWithType = files.map((file) => ({
    ...file,
    fileType: file.filename.split('.').pop().toLowerCase(),
  }));

  useGsap(
    fileRefs.current,
    { opacity: 0, y: 20, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    },
    [filesWithType.length, viewMode], // re-run on list change or mode change
    {
      exitVars: {
        opacity: 0,
        y: 10,
        scale: 0.98,
        duration: 0.2,
        ease: 'power1.in',
      },
    }
  );

  return (
    <div className={styles.container}>
      {/* Header / Controls */}
      <div className={styles.header}>
        <h2>Recent Files</h2>
        <ViewChanger
          views={[
            { value: 'grid', icon: <FiGrid /> },
            { value: 'list', icon: <FiList /> },
          ]}
          defaultView={viewMode}
          onChange={(value) => setViewMode(value)}
        />
      </div>

      {/* Files */}
      <div className={viewMode === 'grid' ? styles.grid : styles.list}>
        {filesWithType.map((file, index) => {
          const { icon: Icon, color } = getFileIconClass(file.fileType);

          return (
            <div
              key={index}
              className={styles.fileCard}
              ref={(el) => (fileRefs.current[index] = el)}>
              <div className={styles.fileHeader}>
                <Icon
                  className={styles.fileIcon}
                  color={color}
                />
                <b className={styles.fileName}>{file.filename}</b>
              </div>

              {viewMode === 'list' && (
                <p className={styles.meta}>
                  {new Date(file.dateUploaded).toLocaleDateString()}
                </p>
              )}
              <div className={styles.gridBottom}>
                {viewMode === 'grid' && (
                  <p className={styles.meta}>
                    {new Date(file.dateUploaded).toLocaleDateString()}
                  </p>
                )}
                <p className={styles.size}>{file.size}</p>
              </div>

              {viewMode === 'list' && <p>{file.fileOwner}</p>}

              <div className={styles.fileOptions}>
                <MoreOptions
                  menuData={fileMoreMenuData}
                  user={user}
                  cardId={index}
                  setShowDropdown={setShowDropdown}
                  showDropdown={showDropdown}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileList;
