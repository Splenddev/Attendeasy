import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = ({ role }) => {
  const quickLinks = [
    { label: 'Dashboard', path: 'dashboard' },
    { label: 'My Attendance', path: 'attendance' },
    { label: 'Class Schedule', path: 'schedules' },
    { label: 'Absent Plea', path: 'plea' },
    { label: 'Notifications', path: 'notifications' },
  ];

  const resources = [
    { label: 'Attendance Policy', path: 'policy' },
    { label: 'Help Center', path: 'help' },
    { label: 'FAQs', path: 'faq' },
    { label: 'Terms of Service', path: 'terms' },
    { label: 'Privacy Policy', path: 'privacy' },
  ];

  return (
    <footer className="app-footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img
            src="/logo.png"
            alt="Attendify Logo"
          />
          <h2>Vigilo</h2>
          <p>Smart, reliable student attendance tracking made easy.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map(({ label, path }) => (
              <li key={path}>
                <NavLink to={`/${role}/${path}`}>{label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            {resources.map(({ label, path }) => (
              <li key={path}>
                <NavLink to={`/${role}/${path}`}>{label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@attendify.app</p>
          <p>Phone: +123 456 7890</p>
          <div className="social-icons">
            <a
              href="#"
              aria-label="Facebook">
              <FaFacebook />
            </a>
            <a
              href="#"
              aria-label="Twitter">
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Attendify. All rights reserved.</p>
        <p>Built with ❤️ for students.</p>
      </div>
    </footer>
  );
};

export default Footer;
