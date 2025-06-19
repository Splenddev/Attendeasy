import React from 'react';
import { FaLock } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import BannerImage from '../BannerImage/BannerImage';
// {
//   excos = [{ name: 'Alex', profile: '/logo.png', role: 'Assistant Rep' }],
// }
const GroupSidebar = ({ group }) => {
  return (
    <div className="group-sidebar">
      <div className="group-details">
        <div className="group-banner">
          <BannerImage bannerUrl={group.bannerUrl} />
          <p>Profile</p>
        </div>
        <div className="group-sidebar-actions">
          <MdSettings />
        </div>
        <div className="group-sidebar-info">
          <h2>Group Name</h2>
          <div>
            <FaLock /> <span>Private group . 5 members</span>
          </div>
          <p>Class rep img</p>
        </div>
      </div>
      {/* <div className="group-sidebar-excos">
        <h2>Executives</h2>
        <div className="excos">
          {excos ? (
            <p>No executive assigned</p>
          ) : (
            excos.map((exco) => (
              <div className="exco">
                <img
                  alt="exco profile"
                  src={exco.profile}
                />{' '}
                <div className="exco-info">
                  <h3>{exco.name}</h3>
                  <p>{exco.role}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div> */}
    </div>
  );
};

export default GroupSidebar;
