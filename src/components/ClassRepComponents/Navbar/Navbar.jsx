/* eslint-disable no-unused-vars */
import './Navbar.css';
import { FaBell, FaHome, FaUserEdit } from 'react-icons/fa';
import { MdContactSupport, MdHelpCenter, MdSettings } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import NotificationPanel from '../../../features/Notifications/NotificationsPanel';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';

const Navbar = ({ dropdownAssets = [] }) => {
  const { user, navTitle } = useAuth();
  const [isDropdown, setIsDropdown] = useState({
    quickLinks: false,
    notifications: false,
  });

  const { notifications } = useNotification();

  const unreadCount = notifications.filter((n) => !n.unread).length;

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <p>{navTitle}</p>
      </div>
      <div className="navbar-side">
        <div
          className="alert"
          onClick={() => console.log(user)}>
          <MdHelpCenter />
        </div>
        <div className="alert">
          <FaBell
            onClick={() =>
              setIsDropdown((prev) => ({
                ...prev,
                notifications: true,
                quickLinks: false,
              }))
            }
          />
          {unreadCount > 0 && <div className="badge">{unreadCount}</div>}
        </div>
        <AnimatePresence>
          {isDropdown.notifications && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="dropdown-notifications">
              <NotificationPanel
                onClose={setIsDropdown}
                user={user}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className="user"
          onClick={() =>
            setIsDropdown((prev) => ({
              ...prev,
              quickLinks: !prev.quickLinks,
              notifications: false,
            }))
          }>
          <div className="details">
            <p className="name">{user.name || 'name'}</p>
            <p className="role">{user.role || 'role'}</p>
          </div>
          <img
            src={user.profilePicture || `/main_${user.role}_avatar.png`}
            className="round"
            alt="user-avatar"
          />
          <AnimatePresence>
            {isDropdown.quickLinks && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="dropdown-menus">
                {[
                  { name: 'home', path: `/${user.role}`, icon: FaHome },
                  { name: 'my profile', path: '/profile', icon: FaUserEdit },
                ].map(({ name, icon: Icon, path }) => (
                  <NavLink
                    to={path}
                    key={name}>
                    <div className="menu cap">
                      <span>
                        <Icon />
                        {name}
                      </span>
                    </div>
                  </NavLink>
                ))}
                {dropdownAssets.map(({ name, icon: Icon, path }) => (
                  <NavLink
                    to={path}
                    key={name}>
                    <div className="menu cap">
                      <span>
                        <Icon />
                        {name}
                      </span>
                    </div>
                  </NavLink>
                ))}
                {[
                  {
                    name: 'contact support',
                    icon: MdContactSupport,
                    path: `#`,
                  },
                  {
                    name: 'settings',
                    icon: MdSettings,
                    path: `#`,
                  },
                ].map(({ name, icon: Icon, path }) => (
                  <NavLink
                    to={path}
                    key={name}>
                    <div className="menu cap">
                      <span>
                        <Icon />
                        {name}
                      </span>
                    </div>
                  </NavLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
