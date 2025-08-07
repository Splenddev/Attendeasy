/* eslint-disable no-unused-vars */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuSearch,
  LuClock,
  LuBookOpen,
  LuUsers,
  LuStar,
  LuPlay,
  LuAward,
  LuCalendar,
  LuTrendingUp,
  LuPlus,
} from 'react-icons/lu';
import styles from './Courses.module.css';
import { MdCheckCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import button from '../../components/Button/Button';

// Sample course data
const coursesData = [
  {
    id: 1,
    title: 'Advanced React Development',
    instructor: 'Sarah Johnson',
    thumbnail:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
    progress: 75,
    category: 'Development',
    level: 'Advanced',
    duration: '12 hours',
    rating: 4.8,
    students: 2847,
    lessons: 24,
    completedLessons: 18,
    lastAccessed: '2 days ago',
    isCompleted: false,
    tags: ['React', 'JavaScript', 'Frontend'],
    description:
      'Master advanced React concepts including hooks, context, performance optimization, and modern patterns.',
  },
  {
    id: 2,
    title: 'UI/UX Design Fundamentals',
    instructor: 'Michael Chen',
    thumbnail:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop',
    progress: 100,
    category: 'Design',
    level: 'Beginner',
    duration: '8 hours',
    rating: 4.9,
    students: 5432,
    lessons: 16,
    completedLessons: 16,
    lastAccessed: '1 week ago',
    isCompleted: true,
    tags: ['UI', 'UX', 'Figma'],
    description:
      'Learn the fundamentals of user interface and user experience design with hands-on projects.',
  },
  {
    id: 3,
    title: 'Python for Data Science',
    instructor: 'Dr. Emily Rodriguez',
    thumbnail:
      'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=200&fit=crop',
    progress: 45,
    category: 'Data Science',
    level: 'Intermediate',
    duration: '15 hours',
    rating: 4.7,
    students: 3921,
    lessons: 32,
    completedLessons: 14,
    lastAccessed: '3 days ago',
    isCompleted: false,
    tags: ['Python', 'Data Analysis', 'Pandas'],
    description:
      'Comprehensive guide to using Python for data analysis, visualization, and machine learning.',
  },
  {
    id: 4,
    title: 'Digital Marketing Strategy',
    instructor: 'James Wilson',
    thumbnail:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
    progress: 20,
    category: 'Marketing',
    level: 'Beginner',
    duration: '10 hours',
    rating: 4.6,
    students: 1876,
    lessons: 20,
    completedLessons: 4,
    lastAccessed: '5 days ago',
    isCompleted: false,
    tags: ['Marketing', 'SEO', 'Social Media'],
    description:
      'Build effective digital marketing campaigns and grow your online presence.',
  },
  {
    id: 5,
    title: 'Machine Learning Essentials',
    instructor: 'Dr. Alex Kumar',
    thumbnail:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop',
    progress: 90,
    category: 'Data Science',
    level: 'Advanced',
    duration: '20 hours',
    rating: 4.9,
    students: 2156,
    lessons: 40,
    completedLessons: 36,
    lastAccessed: '1 day ago',
    isCompleted: false,
    tags: ['ML', 'Python', 'TensorFlow'],
    description:
      'Deep dive into machine learning algorithms, implementation, and real-world applications.',
  },
  {
    id: 6,
    title: 'Mobile App Development',
    instructor: 'Lisa Park',
    thumbnail:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop',
    progress: 60,
    category: 'Development',
    level: 'Intermediate',
    duration: '18 hours',
    rating: 4.8,
    students: 4321,
    lessons: 36,
    completedLessons: 22,
    lastAccessed: '4 days ago',
    isCompleted: false,
    tags: ['React Native', 'Mobile', 'iOS', 'Android'],
    description:
      'Build cross-platform mobile applications using React Native and modern development practices.',
  },
];

const categories = [
  'All',
  'Development',
  'Design',
  'Data Science',
  'Marketing',
];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  const navigate = useNavigate();

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = coursesData.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;
      const matchesLevel =
        selectedLevel === 'All' || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });

    // Sort courses
    switch (sortBy) {
      case 'progress':
        return filtered.sort((a, b) => b.progress - a.progress);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'title':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [searchTerm, selectedCategory, selectedLevel, sortBy]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalCourses = coursesData.length;
    const completedCourses = coursesData.filter(
      (course) => course.isCompleted
    ).length;
    const inProgressCourses = coursesData.filter(
      (course) => !course.isCompleted && course.progress > 0
    ).length;
    const totalHours = coursesData.reduce(
      (sum, course) => sum + parseInt(course.duration),
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

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className={styles.header}>
          <h1 className={styles.title}>My Courses</h1>
          <p className={styles.subtitle}>
            Continue your learning journey and track your progress
          </p>
        </motion.div>

        {/* Stats Cards */}
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

            {/* Category Filter */}
            <select
              className={styles.select}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}>
                  {category}
                </option>
              ))}
            </select>

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

            {/* Sort Filter */}
            <select
              className={styles.select}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}>
              <option value="recent">Recently Accessed</option>
              <option value="progress">Progress</option>
              <option value="rating">Rating</option>
              <option value="title">Title</option>
            </select>
          </div>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          className={styles.courseGrid}
          variants={containerVariants}>
          <AnimatePresence>
            {filteredCourses.map((course) => (
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
                    alt={course.title}
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
                  {course.isCompleted && (
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
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseDescription}>
                    {course.description}
                  </p>
                  <p className={styles.courseInstructor}>
                    by {course.instructor}
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
                      {course.completedLessons}/{course.lessons} lessons
                    </div>
                    <div className={styles.statsGroup}>
                      <LuClock className={styles.icon} />
                      {course.duration}
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className={styles.courseRatings}>
                    <div className={styles.statsGroup}>
                      <LuStar className="w-4 h-4 text-yellow-400 fill-current" />
                      {course.rating}
                    </div>
                    <div className={styles.statsGroup}>
                      <LuUsers className={styles.icon} />
                      {course.students.toLocaleString()} students
                    </div>
                  </div>

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
                  <div className={styles.lastAccessed}>
                    <LuCalendar className={styles.icon} />
                    Last accessed {course.lastAccessed}
                  </div>

                  {/* Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${styles.actionButton} ${
                      course.isCompleted
                        ? styles.buttonGreen
                        : course.progress > 0
                        ? styles.buttonBlue
                        : styles.buttonSlate
                    }`}>
                    {course.isCompleted
                      ? 'Review Materials'
                      : course.progress > 0
                      ? 'Continue Learning'
                      : 'Start Course'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.emptyState}>
            <LuBookOpen className={styles.icon} />
            <h3>No courses found</h3>
            <p>Try adjusting your filters or search terms</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Courses;
