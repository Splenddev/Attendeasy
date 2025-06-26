/* eslint-disable no-unused-vars */
import './SideBar.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { assets } from '../../../assets/assets';
import { MdLogout, MdSettings } from 'react-icons/md';
import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
const SideBar = ({ components, menuActive, setMenuActive }) => {
  const { pathname } = useLocation();
  const { setShowLogoutModal } = useAuth();

  useEffect(() => {
    setMenuActive(false);
  }, [pathname, setMenuActive]);
  return (
    <aside className={`c-sidebar-container ${!menuActive ? 'closed' : ''}`}>
      <div className={`c-sidebar ${!menuActive ? 'closed' : ''}`}>
        <AnimatePresence>
          {menuActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overlay"
              onClick={() => setMenuActive(false)}></motion.div>
          )}
        </AnimatePresence>
        <div
          className="close"
          onClick={() => setMenuActive(!menuActive)}>
          <div className={`menu ${menuActive ? 'open' : 'closed'}`}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <AnimatePresence>
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="c-sidebar-left">
            <div className="c-sidebar-header">
              <img
                src={assets.logo}
                alt="logo"
              />
            </div>
            <div className="c-sidebar-left-icon">
              <AnimatePresence>
                {components.map(({ icon, link }) => {
                  const Icon = icon;
                  return (
                    <NavLink
                      to={link}
                      key={link}>
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.2 }}
                        className="icon">
                        <Icon />
                      </motion.div>
                    </NavLink>
                  );
                })}
              </AnimatePresence>
            </div>
            <div className="other-navs">
              <span onClick={() => setShowLogoutModal(true)}>
                <MdLogout />
              </span>
              <span>
                <MdSettings />
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="c-sidebar-right">
          <div className="c-sidebar-header">
            <p>Vigilo</p>
          </div>
          <div className="c-sidebar-right-texts">
            <AnimatePresence>
              {menuActive &&
                components.map(({ label, link }) => {
                  return (
                    <NavLink
                      to={link}
                      key={link}>
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
          <div className="other-navs">
            <p onClick={() => setShowLogoutModal(true)}>Log Out</p>
            <p>Settings</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
