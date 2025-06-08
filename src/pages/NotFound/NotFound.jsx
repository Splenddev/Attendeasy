import { MdContactSupport, MdDashboard, MdHome, MdPhone } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeRedirect = () => navigate('/');
  const handleDashboardRedirect = () => navigate('/dashboard');
  const handleSupport = () =>
    window.open('mailto:support@example.com', '_blank');

  return (
    <div style={styles.container}>
      <img
        src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
        alt="404 animation"
        style={styles.image}
      />

      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.subheading}>
        Sorry, we couldn't find:{' '}
        <code style={styles.code}>{location.pathname}</code>
      </p>

      <p style={styles.text}>
        This page doesn't exist or may have moved. You can:
      </p>

      <div style={styles.actions}>
        <button
          style={styles.button}
          onClick={handleHomeRedirect}>
          <MdHome /> Go to Homepage
        </button>
        <button
          style={styles.button}
          onClick={handleDashboardRedirect}>
          <MdDashboard /> Go to Dashboard
        </button>
        <button
          style={styles.buttonOutline}
          onClick={handleSupport}>
          <MdPhone /> Contact Support
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '3rem',
    textAlign: 'center',
  },
  image: {
    width: '90%',
    maxWidth: '500px',
    marginBottom: '2rem',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#ff4c4c',
  },
  subheading: {
    fontSize: '1.2rem',
    margin: '1rem 0',
  },
  code: {
    backgroundColor: '#f5f5f5',
    padding: '0.3rem 0.6rem',
    borderRadius: '5px',
    fontFamily: 'monospace',
    fontSize: '1rem',
  },
  text: {
    fontSize: '1rem',
    marginBottom: '2rem',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    padding: '0.7rem 1.2rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  buttonOutline: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    padding: '0.7rem 1.2rem',
    backgroundColor: '#fff',
    color: '#007bff',
    border: '2px solid #007bff',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default NotFound;
