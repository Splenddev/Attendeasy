import React from 'react';
import './Navbar.css';
import { FaAngleDown, FaBell } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { assets } from '../../../assets/assets';
import { MdMail } from 'react-icons/md';
const Navbar = () => {
  const { user, navTitle } = useAuth();
  return (
    <div className="navbar">
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
        <div className="user">
          <div className="details">
            <p className="name">{user.name}</p>
            <p className="role">{user.role}</p>
          </div>
          <img src={assets.profile} />
          <FaAngleDown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
