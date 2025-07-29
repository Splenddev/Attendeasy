import React from 'react';
import { motion } from 'framer-motion';
import styles from './Loader.module.css';

const letters = 'Vigilo'.split('');

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const letterVariants = {
  initial: { y: 30, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 500, damping: 30 },
  },
};

const Loader = () => {
  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <motion.div
        className={styles.loader}
        variants={containerVariants}
        initial="initial"
        animate="animate">
        <motion.h1 className={styles.logo}>
          {letters.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className={styles.letter}
              style={{ '--i': index }}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}>
          Preparing your experience...
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
