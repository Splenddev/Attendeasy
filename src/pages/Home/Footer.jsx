import styles from './Home.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerLinks}>
      <a href="#">About</a>
      <a href="#">Contact</a>
      <a href="#">FAQ</a>
      <a href="#">Terms</a>
      <a href="#">Privacy</a>
    </div>
    <div className={styles.footerBottom}>
      <p>© {new Date().getFullYear()} Vigilo | Built for smarter classrooms.</p>
    </div>
  </footer>
);

export default Footer;
