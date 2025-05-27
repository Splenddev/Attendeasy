/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './ClassRepDashboard.css';
import { useAuth } from '../../../context/AuthContext';
import { todaySchedule } from '../../../assets/assets';
import {
  FaCircle,
  FaClock,
  FaGraduationCap,
  FaHourglassHalf,
  FaUserCheck,
  FaUserTimes,
} from 'react-icons/fa';
import { FiCircle } from 'react-icons/fi';
import { MdBlock } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { timeFormatter } from '../../../utils/helpers';

const ClassRepDashboard = () => {
  const { setNavTitle } = useAuth();
  useEffect(() => {
    setNavTitle('Dashboard');
  }, [setNavTitle]);
  const [navMenu, setNavMenu] = useState('today');
  return (
    <div className="c-dashboard">
      <div className="c-dashboard-left">
        <div className="attendance-record">
          <ul className="attendance-record-navs">
            <li
              className={`${navMenu === 'today' ? 'active' : ''}`}
              onClick={() => setNavMenu('today')}>
              Todays Attendance
            </li>
            <li
              className={`${navMenu === 'yesterday' ? 'active' : ''}`}
              onClick={() => setNavMenu('yesterday')}>
              Yesterdays Attendance
            </li>
          </ul>
          <ul className="attendance-record-values">
            <li>
              <p>633</p>
              <span>
                <FaGraduationCap />
                Total Students
              </span>
            </li>
            <li>
              <p>533</p>
              <span>
                <FaUserCheck /> Present
              </span>
            </li>
            <li>
              <p>60</p>
              <span>
                <FaUserTimes />
                Absent
              </span>
            </li>
            <li>
              <p>40</p>
              <span>
                <FaClock />
                Late
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="c-dashboard-right">
        <div className="today-schedule-wrap">
          <h2>Today's Schedules</h2>
          <div className="schedules">
            <AnimatePresence>
              {todaySchedule
                .sort(
                  (a, b) =>
                    new Date(a.time.start).getTime() -
                    new Date(b.time.start).getTime()
                )
                .map(({ course, time, progress }, index) => {
                  const now = timeFormatter(null, 'en-US');

                  return (
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index / 10 + 0.1, duration: 1 }}
                      className="schedule"
                      key={course.code}>
                      <div className="schedule-left">
                        <div className="schedule-time">
                          <span>
                            <FiCircle className="start icon" /> Start
                          </span>
                          <p>{timeFormatter(time.start)}</p>
                        </div>
                        <div className="schedule-time">
                          <span>
                            {' '}
                            <FiCircle className="end icon" />
                            End
                          </span>
                          <p>{timeFormatter(time.end, 'en-US')}</p>
                        </div>
                      </div>
                      <div className="schedule-right">
                        <p className="title">{course.title}</p>
                        <p className="">Lecturer: {course.lecturer}</p>
                        <div className="class-status">
                          {timeFormatter(time.start) > now ? (
                            <>
                              <MdBlock />
                              <p>Not Yet Time</p>
                            </>
                          ) : timeFormatter(time.start) < now &&
                            timeFormatter(time.end) > now ? (
                            <>
                              <MdBlock />
                              <p>Class Ended</p>
                            </>
                          ) : (
                            <>
                              <FaHourglassHalf />
                              <p>In Progress</p>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRepDashboard;
