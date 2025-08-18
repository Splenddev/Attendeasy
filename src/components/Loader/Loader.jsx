import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Loader.module.css';

const Loader = () => {
  const lettersRef = useRef([]);
  const subtitleRef = useRef();
  const progressBarRef = useRef();
  // const [show, setShow] = useState(true);

  useEffect(() => {
    // Animate letters
    const tl = gsap.timeline();

    tl.set(lettersRef.current, {
      opacity: 0,
      y: 100,
      rotationX: 90,
      scale: 0.5,
      transformOrigin: 'center bottom',
    })
      .to(lettersRef.current, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(2)',
        stagger: 0.1,
      })
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        progressBarRef.current,
        { x: '-100%' },
        { x: '0%', duration: 2.5, ease: 'power2.inOut' },
        '-=0.4'
      );

    return () => tl.kill();
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => setShow(false), minDelay);
  //   return () => clearTimeout(timer);
  // }, [minDelay]);

  // if (!show) return null;

  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loaderContainer}>
        <div className={styles.vigiloText}>
          {['V', 'I', 'G', 'I', 'L', 'O'].map((char, index) => (
            <span
              key={index}
              className={styles.letter}
              ref={(el) => (lettersRef.current[index] = el)}>
              {char}
            </span>
          ))}
        </div>

        <div
          ref={subtitleRef}
          className={styles.subtitle}>
          Attendance Management System
        </div>

        <div className={styles.progressContainer}>
          <div
            ref={progressBarRef}
            className={styles.progressBar}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
