import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { BiErrorAlt, BiHomeAlt } from 'react-icons/bi';
import styles from './ErrorFallback.module.css';

const ErrorFallback = () => {
  const error = useRouteError();

  const handleBackHome = () => {
    window.location.href = '/';
  };

  const title = isRouteErrorResponse(error)
    ? `${error.status} - ${error.statusText}`
    : 'Unexpected Error';

  const message = isRouteErrorResponse(error)
    ? error.data?.message || 'Something went wrong while loading this page.'
    : error?.message || 'An unknown error occurred. Please try again later.';

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <BiErrorAlt />
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>

        <div className={styles.tipBox}>
          <h4>💡 What you can do:</h4>
          <ul>
            <li>Check your internet connection.</li>
            <li>Make sure the page URL is correct.</li>
            <li>Return home and try again.</li>
            <li>If the issue persists, contact support.</li>
          </ul>
        </div>

        <button
          onClick={handleBackHome}
          className={styles.button}>
          <BiHomeAlt />
          <span>Return to Homepage</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
