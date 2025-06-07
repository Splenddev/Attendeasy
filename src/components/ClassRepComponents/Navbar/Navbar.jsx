/* eslint-disable no-unused-vars */
import './Navbar.css';
import { FaBell, FaHome, FaUserEdit } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { assets, notifications } from '../../../assets/assets';
import { MdContactSupport, MdHelpCenter, MdSettings } from 'react-icons/md';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import NotificationPanel from '../../../features/Notifications/NotificationsPanel';
const Navbar = ({ dropdownAssets = [] }) => {
  const { user, navTitle } = useAuth();
  const [isDropdown, setIsDropdown] = useState({
    quickLinks: false,
    notifications: false,
  });
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <p>{navTitle}</p>
      </div>
      <div className="navbar-side">
        <div className="alert ">
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
          <div className="badge">4</div>
        </div>
        <AnimatePresence>
          {isDropdown.notifications && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="dropdown-notifications">
              <NotificationPanel
                notifications={notifications}
                onClose={setIsDropdown}
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
              notifications: !prev.quickLinks ? false : true,
            }))
          }>
          <div className="details">
            <p className="name">{user.name||'name'}</p>
            <p className="role">{user.role||'role'}</p>
          </div>
          <img src={assets.profile} />
          <AnimatePresence>
            {isDropdown.quickLinks && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="dropdown-menus">
                {[
                  { name: 'home', path: `/${user.role}`, icon: FaHome },
                  { name: 'my profile', path: '#', icon: FaUserEdit },
                ].map(({ name, icon, path }) => {
                  const Icon = icon;
                  return (
                    <NavLink to={path}>
                      <div className="menu cap">
                        <span>
                          <Icon />
                          {name}
                        </span>
                      </div>
                    </NavLink>
                  );
                })}
                {dropdownAssets.map(({ name, icon, path }) => {
                  const Icon = icon;
                  return (
                    <NavLink to={path}>
                      <div className="menu cap">
                        <span>
                          <Icon />
                          {name}
                        </span>
                      </div>
                    </NavLink>
                  );
                })}
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
                ].map(({ name, icon, path }) => {
                  const Icon = icon;
                  return (
                    <NavLink to={path}>
                      <div className="menu cap">
                        <span>
                          <Icon />
                          {name}
                        </span>
                      </div>
                    </NavLink>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
