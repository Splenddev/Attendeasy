/* eslint-disable no-unused-vars */
import './SideBar.css';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { assets } from '../../../assets/assets';
const SideBar = ({ components, menuActive, setMenuActive }) => {
  return (
    <div className="c-sidebar-container">
      <div className={`c-sidebar ${!menuActive ? 'closed' : ''}`}>
        <div
          className="close"
          onClick={() => setMenuActive(!menuActive)}>
          <div className={`menu ${menuActive ? 'open' : 'closed'}`}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <div className="c-sidebar-left">
          <div className="c-sidebar-header">
            <img
              src={assets.logo}
              alt="logo"
            />
          </div>
          <div className="c-sidebar-left-icon">
            {components.map(({ icon, link }) => {
              const Icon = icon;
              return (
                <NavLink
                  to={link}
                  key={link}>
                  <div className="icon">{<Icon />}</div>
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="c-sidebar-right">
          <div className="c-sidebar-header">
            <p>Class Tracker</p>
          </div>
          <div className="c-sidebar-right-texts">
            <AnimatePresence>
              {menuActive &&
                components.map(({ label, link }) => {
                  return (
                    <NavLink to={link}>
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.2 }}
                        className="text">
                        {label}
                        <div className="indicator"></div>
                      </motion.div>
                    </NavLink>
                  );
                })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
