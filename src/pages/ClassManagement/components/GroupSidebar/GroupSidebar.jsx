import React from 'react';
import { FaLock } from 'react-icons/fa';
import { MdLogout, MdSettings } from 'react-icons/md';
import BannerImage from '../BannerImage/BannerImage';
import styles from './GroupSidebar.module.css';
import { FiRefreshCcw } from 'react-icons/fi';
import button from '../../../../components/Button/Button';
import { leaveGroupService } from '../../../../services/group.service';
import { toast } from 'react-toastify';

const GroupSidebar = ({ group, refresh, user }) => {
  const handleLeave = async () => {
    try {
      const result = await leaveGroupService();
      toast.success(result.message);
      // Optionally update UI or redirect
    } catch (err) {
      toast.error(err.message || 'Error leaving group');
    }
  };

  return (
    <aside className={`center ${styles.sidebar}`}>
      <div className={styles.sidebarGrid}>
        <div className={`center ${styles.bannerSection}`}>
          <BannerImage
            bannerUrl={group.bannerUrl}
            height="100%"
            borderRadius="20px"
          />
        </div>

        <div className={styles.sidebarContents}>
          <div className={styles.actions}>
            {button.icon({
              icon: MdSettings,
              name: styles.settingsBtn + ' center',
            })}

            {button.multiple({
              icon: FiRefreshCcw,
              name: styles.refreshBtn,
              func: refresh,
              element: 'Refresh',
            })}
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
              <p>Owner: {group.creator?.name || 'Class Representative'}</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <p className={styles.bannerLabel}>Group Profile</p>
      {user.role === 'student' &&
        button.multiple({
          icon: MdLogout,
          element: 'Leave Group',
          func: handleLeave,
          name: styles.leave_group_btn,
        })}
    </aside>
  );
};

export default GroupSidebar;
