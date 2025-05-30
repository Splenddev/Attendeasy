/* eslint-disable no-unused-vars */
import './Navbar.css';
import { FaBell, FaHome, FaPlus, FaUserEdit } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { assets } from '../../../assets/assets';
import {
  MdContactSupport,
  MdHelpCenter,
  MdMail,
  MdSettings,
} from 'react-icons/md';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
const Navbar = ({ dropdownAssets = [] }) => {
  const { user, navTitle } = useAuth();
  const [isDropdown, setIsDropdown] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <p>{navTitle}</p>
      </div>
      <div className="navbar-side">
        <div className="alert ">
          <MdHelpCenter />
        </div>
        <div className="alert notification">
          <FaBell />
          <div className="badge">4</div>
        </div>
        <div
          className="user"
          onClick={() => setIsDropdown((prev) => !prev)}>
          <div className="details">
            <p className="name">{user.name}</p>
            <p className="role">{user.role}</p>
          </div>
          <img src={assets.profile} />
          <AnimatePresence>
            {isDropdown && (
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
