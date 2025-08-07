/* eslint-disable no-unused-vars */
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuSearch,
  LuClock,
  LuBookOpen,
  LuPlay,
  LuAward,
  LuTrendingUp,
  LuPlus,
} from 'react-icons/lu';
import styles from './Courses.module.css';
import { MdCheckCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import button from '../../components/Button/Button';
import useCourses from '../../hooks/useCourses';
import { FiRefreshCcw } from 'react-icons/fi';
import FullPageLoader from '../../components/Loader/FullPageLoader/FullPageLoader';
import { useAuth } from '../../context/AuthContext';

// Sample course data

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const navigate = useNavigate();

  const { setNavTitle } = useAuth();

  useEffect(() => setNavTitle('My Courses'), [setNavTitle]);

  const { courses = [], loading, refetch } = useCourses();

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        course.courseTitle.toLowerCase().includes(lowerSearch) ||
        course.instructor?.name?.toLowerCase().includes(lowerSearch) ||
        course.tags.some((tag) => tag.toLowerCase().includes(lowerSearch));

      const matchesLevel =
        selectedLevel === 'All' || course.level === selectedLevel;

      return matchesSearch && matchesLevel;
    });
  }, [courses, searchTerm, selectedLevel]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalCourses = courses.length;
    const completedCourses = courses.filter(
      (course) => course.completed
    ).length;
    const inProgressCourses = courses.filter(
      (course) => !course.completed && course.progress > 0
    ).length;
    const totalHours = courses.reduce(
      (sum, course) => sum + parseInt(course.estimatedHours),
      0
    );

    return { totalCourses, completedCourses, inProgressCourses, totalHours };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  if (loading) {
    return (
      <FullPageLoader
        show={loading}
        message="Loading Courses..."
        subMessage="Fetching the latest course details for you. Hang tight!"
        theme="dark"
      />
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div>
        No course found
        {button.multiple({
          icon: FiRefreshCcw,
          func: refetch,
          disabled: loading,
          element: 'Retry',
          name: 'default_button',
        })}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        <motion.div
          variants={itemVariants}
          className={styles.statsGrid}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={styles.iconContainer}>
                <LuBookOpen className={styles.icon} />
              </div>
              <div>
                <p className={styles.statValue}>{stats.totalCourses}</p>
                <p className={styles.statLabel}>Total Courses</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.iconContainer} ${styles.greenBg}`}>
                <MdCheckCircle
                  className={`${styles.icon} ${styles.greenText}`}
                />
              </div>
              <div>
                <p className={styles.statValue}>{stats.completedCourses}</p>
                <p className={styles.statLabel}>Completed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.iconContainer} ${styles.orangeBg}`}>
                <LuTrendingUp
                  className={`${styles.icon} ${styles.orangeText}`}
                />
              </div>
              <div>
                <p className={styles.statValue}>{stats.inProgressCourses}</p>
                <p className={styles.statLabel}>In Progress</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.iconContainer} ${styles.purpleBg}`}>
                <LuClock className={`${styles.icon} ${styles.purpleText}`} />
              </div>
              <div>
                <p className={styles.statValue}>{stats.totalHours}</p>
                <p className={styles.statLabel}>Total Hours</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {button.multiple({
          icon: LuPlus,
          func: () => navigate('new'),
          element: 'New Course',
          name: 'default_button',
        })}

        {/* Filters and Search */}
        <motion.div
          variants={itemVariants}
          className={styles.filterContainer}>
          <div className={styles.filterRow}>
            {/* Search */}
            <div className={styles.searchWrapper}>
              <LuSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search courses, instructors, or topics..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Level Filter */}
            <select
              className={styles.select}
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}>
              {levels.map((level) => (
                <option
                  key={level}
                  value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          className={styles.courseGrid}
          variants={containerVariants}>
          <AnimatePresence>
            {!filteredCourses ? (
              <p>Nothing</p>
            ) : (
              filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  className={`${styles.courseCard} ${styles.groupHover}`}>
                  {/* Thumbnail */}
                  <div
                    className={`${styles.thumbnailWrapper} ${styles.groupHover}`}>
                    <img
                      src={course.thumbnail}
                      alt={course.courseTitle}
                      className={styles.thumbnailImage}
                    />
                    <div className={styles.thumbnailOverlay}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={styles.playButton}>
                        <LuPlay className={styles.icon} />
                      </motion.div>
                    </div>
                    {course.completed && (
                      <div className={styles.completionBadge}>
                        <LuAward />
                        Completed
                      </div>
                    )}
                    <div
                      className={`${styles.levelBadge} ${
                        course.level === 'Beginner'
                          ? styles.levelBeginner
                          : course.level === 'Intermediate'
                          ? styles.levelIntermediate
                          : styles.levelAdvanced
                      }`}>
                      {course.level}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={styles.courseContent}>
                    <h3 className={styles.courseTitle}>{course.courseTitle}</h3>
                    <p className={styles.courseDescription}>
                      {course.description}
                    </p>
                    <p className={styles.courseInstructor}>
                      by {course.instructor.name}
                    </p>

                    {/* Progress */}
                    <div className={styles.progressWrapper}>
                      <div className={styles.progressTop}>
                        <span className={styles.progressLabel}>Progress</span>
                        <span className={styles.progressValue}>
                          {course.progress}%
                        </span>
                      </div>
                      <div className={styles.progressBarBackground}>
                        <motion.div
                          className={`${styles.progressBarFill} ${
                            course.progress === 100
                              ? styles.progressGreen
                              : styles.progressBlue
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className={styles.courseStats}>
                      <div className={styles.statsGroup}>
                        <LuBookOpen className={styles.icon} />
                        {course.completedSchedules}/{course.expectedSchedules}{' '}
                        lessons
                      </div>
                      <div className={styles.statsGroup}>
                        <LuClock className={styles.icon} />
                        {course.estimatedHours}
                      </div>
                    </div>

                    {/* Ratings */}
                    {/* <div className={styles.courseRatings}>
                    <div className={styles.statsGroup}>
                      <LuStar className="w-4 h-4 text-yellow-400 fill-current" />
                      {course.rating}
                    </div>
                    <div className={styles.statsGroup}>
                      <LuUsers className={styles.icon} />
                      {course.students.toLocaleString()} students
                    </div>
                  </div> */}

                    {/* Tags */}
                    <div className={styles.courseTags}>
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Last Accessed */}
                    {/* <div className={styles.lastAccessed}>
                    <LuCalendar className={styles.icon} />
                    Last accessed {course.lastAccessed}
                  </div> */}

                    {/* Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`${styles.actionButton} ${
                        course.completed
                          ? styles.buttonGreen
                          : course.progress > 0
                          ? styles.buttonBlue
                          : styles.buttonSlate
                      }`}>
                      {course.completed
                        ? 'Review Materials'
                        : course.progress > 0
                        ? 'Continue Learning'
                        : 'Start Course'}
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {!filteredCourses ||
          (filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.emptyState}>
              <LuBookOpen className={styles.icon} />
              <h3>No courses found</h3>
              <p>Try adjusting your filters or search terms</p>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default Courses;
