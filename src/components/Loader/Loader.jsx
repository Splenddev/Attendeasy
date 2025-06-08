// Loader.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { PuffLoader } from 'react-spinners';

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const loaderVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
  exit: { scale: 0.8, opacity: 0 },
};

const Loader = ({ loading = true, message = 'Loading...' }) => {
  if (!loading) return null;

  return (
    <motion.div
      className="page-loader-backdrop"
      variants={backdropVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}>
      <motion.div
        className="loader-content"
        variants={loaderVariants}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
        }}>
        <PuffLoader
          color="#36D7B7"
          size={80}
        />
        <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>{message}</p>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
