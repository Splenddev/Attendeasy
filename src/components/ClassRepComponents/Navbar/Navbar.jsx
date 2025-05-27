/* eslint-disable no-unused-vars */
import './Navbar.css';
import { FaBell, FaUserEdit } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { assets } from '../../../assets/assets';
import { MdMail } from 'react-icons/md';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
const Navbar = () => {
  const { user, navTitle } = useAuth();
  const [isDropdown, setIsDropdown] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <p>{navTitle}</p>
      </div>
      <div className="navbar-side">
        <div className="alert notification">
          <FaBell />
          <div className="badge">4</div>
        </div>
        <div className="alert messages">
          <MdMail />
          <div className="badge">7</div>
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
                <div className="menu">
                  <span>
                    <MdMail />
                    Message
                  </span>
                  <div className="badge">7</div>
                </div>
                <div className="menu">
                  <span>
                    <FaBell />
                    Notifications
                  </span>
                  <div className="badge">7</div>
                </div>
                <div className="menu">
                  <span>
                    <FaUserEdit />
                    My Profile
                  </span>
                  <div className="badge">7</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
