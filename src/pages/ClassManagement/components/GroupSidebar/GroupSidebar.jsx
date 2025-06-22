import React from 'react';
import { FaLock } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import BannerImage from '../BannerImage/BannerImage';
import styles from './GroupSidebar.module.css';

const GroupSidebar = ({ group }) => {
  return (
    <aside className={`center ${styles.sidebar}`}>
      <p className={styles.bannerLabel}>Group Profile</p>
      <div className={styles.sidebarGrid}>
        <div className={`center ${styles.bannerSection}`}>
          <BannerImage bannerUrl={group.bannerUrl} />
        </div>

        <div className={styles.sidebarContents}>
          <div className={styles.actions}>
            <MdSettings className={styles.settingsIcon} />
          </div>

          <div className={styles.info}>
            <h2 className={styles.groupName}>
              {group.groupName || 'Unnamed Group'}
            </h2>
            <div className={styles.meta}>
              <FaLock />
              <span className="cap">
                {group.visibility} group · {group.members?.length || 0} members
              </span>
            </div>
            <div className={styles.classRep}>
              <img
                src={group.creator?.avatar || '/main_class-rep_avatar.png'}
                alt="Class Rep"
              />
              <p>{group.creator?.name || 'Class Representative'}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default GroupSidebar;
