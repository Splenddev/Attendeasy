import React, { useState, useEffect, useMemo } from 'react';
import {
  LuChevronLeft,
  LuChevronRight,
  LuLightbulb,
  LuPause,
  LuPlay,
} from 'react-icons/lu';
import styles from './SmartTipSlider.module.css';
import { generateSmartTip } from '../../../../../utils/helpers';

const SmartTipSlider = ({ data = {}, user = {}, loading }) => {
  const smartTips = useMemo(
    () => generateSmartTip(data, user, loading),
    [data, user, loading]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || smartTips.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % smartTips.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, smartTips.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? smartTips.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % smartTips.length);
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  if (!smartTips.length) return null;

  return (
    <div className={styles.container}>
      <div
        className={styles.sliderContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
        {/* Background Pattern */}
        <div className={styles.backgroundPattern}>
          <div className={styles.radialGradient}></div>
          <div className={styles.diagonalPattern}></div>
        </div>

        {/* Content Container */}
        <div className={styles.contentContainer}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.titleSection}>
              <div className={styles.iconWrapper}>
                <LuLightbulb className={styles.lightbulbIcon} />
              </div>
              <h3 className={styles.title}>Smart Tips</h3>
            </div>

            {/* Controls */}
            <div className={styles.controls}>
              <button
                onClick={togglePlayPause}
                className={styles.controlButton}>
                {isPaused ? (
                  <LuPlay className={styles.controlIcon} />
                ) : (
                  <LuPause className={styles.controlIcon} />
                )}
              </button>

              <button
                onClick={goToPrevious}
                className={styles.controlButton}>
                <LuChevronLeft className={styles.controlIcon} />
              </button>

              <button
                onClick={goToNext}
                className={styles.controlButton}>
                <LuChevronRight className={styles.controlIcon} />
              </button>
            </div>
          </div>

          {/* Tips Container */}
          <div className={styles.tipsContainer}>
            <div className={styles.tipsWrapper}>
              <div
                className={styles.tipsTrack}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {smartTips.map((tip, index) => (
                  <div
                    key={index}
                    className={styles.tipSlide}>
                    <div className={styles.tipCard}>
                      <p className={styles.tipText}>{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className={styles.indicators}>
            {smartTips.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${styles.indicator} ${
                  index === currentIndex ? styles.indicatorActive : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className={styles.floatingElement1}></div>
      <div className={styles.floatingElement2}></div>
    </div>
  );
};

export default SmartTipSlider;
