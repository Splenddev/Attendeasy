import { useEffect, useState } from 'react';
import styles from './GroupResources.module.css';
import ImageDropzone from '../../components/ImageDropzone/ImageDropzone';
import button from '../../components/Button/Button';
import {
  LuCat,
  LuFolderPlus,
  LuFootprints,
  LuPen,
  LuPlus,
  LuSmartphone,
  LuTrash,
  LuTrash2,
} from 'react-icons/lu';
import { useAuth } from '../../context/AuthContext';
import { MdLock, MdLockOpen } from 'react-icons/md';
import {
  FiEdit,
  FiEdit2,
  FiLock,
  FiMoreVertical,
  FiPenTool,
  FiPlus,
  FiUnlock,
} from 'react-icons/fi';
import { FaExclamationTriangle, FaLock, FaLockOpen } from 'react-icons/fa';
import FileList from './components/FileList/FileList';
import MoreOptions from '../../features/MoreOptions/MoreOptions';

const test = [
  {
    icon: LuPen,
    folderName: 'Accounting',
    fileCount: 23,
    folderSize: 93,
    isLocked: true,
    contributors: ['Max', 'Pete', 'Job', 'Nelson'],
  },
  {
    icon: LuFootprints,
    folderName: 'Criminology',
    fileCount: 46,
    folderSize: 23,
    isLocked: false,
    contributors: ['Jane', 'Max', 'Camie'],
  },
  {
    icon: LuSmartphone,
    folderName: 'Engineering',
    fileCount: 23,
    folderSize: 93,
    isLocked: true,
    contributors: ['Max', 'Pete', 'Job', 'Nelson'],
  },
  {
    icon: LuCat,
    folderName: 'Biology',
    fileCount: 106,
    folderSize: 88,
    isLocked: false,
    contributors: ['Jane', 'Max'],
  },
];

const recentFiles = [
  {
    filename: 'Biochemistry_Lecture_Notes.pdf',
    dateUploaded: '2025-08-05T09:42:00Z',
    lastUpdated: '2025-08-08T14:15:00Z',
    size: '2.4 MB',
    fileOwner: 'Dr. A. Johnson',
    comments: [
      {
        user: 'Mary Okafor',
        text: 'Very helpful for the last test.',
        date: '2025-08-08T15:10:00Z',
      },
      {
        user: 'James Ade',
        text: 'Could you add more on enzyme inhibition?',
        date: '2025-08-08T16:22:00Z',
      },
    ],
  },
  {
    filename: 'Attendance_Report_July.xlsx',
    dateUploaded: '2025-08-02T10:20:00Z',
    lastUpdated: '2025-08-02T10:20:00Z',
    size: '980 KB',
    fileOwner: 'Mary Okafor',
    comments: [
      {
        user: 'Dr. A. Johnson',
        text: 'Thanks, this matches my records.',
        date: '2025-08-02T11:05:00Z',
      },
    ],
  },
  {
    filename: 'Group_Photo_Event.jpg',
    dateUploaded: '2025-08-06T15:30:00Z',
    lastUpdated: '2025-08-06T15:30:00Z',
    size: '3.1 MB',
    fileOwner: 'James Ade',
    comments: [
      {
        user: 'Grace Umeh',
        text: 'I love this shot!',
        date: '2025-08-06T16:00:00Z',
      },
      {
        user: 'Mary Okafor',
        text: 'Can we get a higher resolution version?',
        date: '2025-08-06T16:25:00Z',
      },
    ],
  },
  {
    filename: 'Assignment_Topic_Brief.docx',
    dateUploaded: '2025-08-04T08:00:00Z',
    lastUpdated: '2025-08-07T11:05:00Z',
    size: '512 KB',
    fileOwner: 'Prof. R. Emmanuel',
    comments: [
      {
        user: 'John Bello',
        text: 'The objectives are much clearer now.',
        date: '2025-08-07T12:15:00Z',
      },
    ],
  },
  {
    filename: 'Lab_Safety_Guidelines.pdf',
    dateUploaded: '2025-07-28T13:45:00Z',
    lastUpdated: '2025-08-01T09:12:00Z',
    size: '1.7 MB',
    fileOwner: 'Dept. Safety Officer',
    comments: [
      {
        user: 'Mary Okafor',
        text: 'The chemical handling section is detailed.',
        date: '2025-08-01T10:00:00Z',
      },
      {
        user: 'James Ade',
        text: 'Could you add a section on biological waste disposal?',
        date: '2025-08-01T11:45:00Z',
      },
    ],
  },
];

const menuData = (isLocked) => [
  {
    id: 'add',
    label: 'Add',
    icon: <LuPlus />,
    for: null,
  },
  {
    id: 'lockToggle',
    label: isLocked ? 'Unlock' : 'Lock',
    icon: isLocked ? <FaLockOpen /> : <FaLock />,
    for: 'class-rep',
  },
  {
    id: 'rename',
    label: 'Rename',
    icon: <FiEdit2 />,
    for: 'class-rep',
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <LuTrash />,
    for: 'class-rep',
    style: { color: 'var(--red)' },
  },
];

const GroupResources = () => {
  const { user, setNavTitle } = useAuth();
  var [images, setImages] = useState([]);

  var [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setNavTitle('Group library');
  }, [setNavTitle]);
  return (
    <div className={styles.groupResources}>
      <aside className={styles.main}>
        <header>
          <div className={styles.top}>
            <h1>group library</h1>
            <p>Efficiently manage and organize class resources effortlessly</p>
          </div>
          {button.multiple({
            icon: LuFolderPlus,
            element: 'Add A Folder',
            name: styles.newFolderBtn,
          })}
        </header>

        <section className={styles.uploadSection}>
          <ImageDropzone
            images={images}
            maxFiles={10}
          />
        </section>
        <section className={styles.folderCategory}>
          <h3>Folders</h3>
          <div className={styles.folders}>
            {test.length === 0 || !test ? (
              <p>No folders yet</p>
            ) : (
              test.map((folder) => {
                const {
                  folderName,
                  icon: Icon,
                  contributors,
                  fileCount,
                  folderSize,
                  isLocked,
                } = folder;

                const all = contributors.length;
                const viewLength = contributors.slice(0, 3).length;
                const remaining = all - viewLength;

                return (
                  <div
                    className={styles.folder}
                    key={folderName}>
                    <div className={styles.top}>
                      <Icon className={styles.icon} />
                      <MoreOptions
                        user={user}
                        menuData={menuData(isLocked)}
                        cardId={folderName}
                        setShowDropdown={setShowDropdown}
                        showDropdown={showDropdown}
                      />
                    </div>
                    <div className={styles.folderInfo}>
                      <p>{folderName}</p>
                      <small>
                        {fileCount} file{fileCount > 1 ? 's' : ''} /{' '}
                        {folderSize}
                        mb
                      </small>
                    </div>
                    <div className={styles.bottom}>
                      {isLocked && (
                        <div className={styles.locked}>
                          <FiLock />
                        </div>
                      )}
                      {contributors && (
                        <div className={styles.contributors}>
                          {contributors.slice(0, 3).map((c) => {
                            return (
                              <div className={`${styles.contributor} center`}>
                                {c.charAt(0)}
                              </div>
                            );
                          })}
                          {remaining > 0 && (
                            <div
                              className={`${styles.contributor} ${styles.extra} center`}>
                              +{remaining}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className={styles.info}>
                      <FaExclamationTriangle className={styles.infoIcon} />
                      <span>
                        If you lock this folder, no file can be be uploaded by
                        anyone except you.
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section className={styles.recentFilesCategory}>
          <h3>Recent Files</h3>
          <FileList
            files={recentFiles}
            defaultView={'grid'}
            user={user}
          />
        </section>
      </aside>
      <div className={styles.fileDetail}>2 files</div>
    </div>
  );
};

export default GroupResources;
