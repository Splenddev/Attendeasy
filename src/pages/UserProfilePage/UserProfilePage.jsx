import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaIdBadge,
  FaGraduationCap,
  FaBuilding,
  FaLayerGroup,
  FaCheckCircle,
  FaExclamationCircle,
  FaSignInAlt,
  FaUserPlus,
  FaClock,
  FaArrowLeft,
  FaUsers,
  FaEye,
  FaCalendarAlt,
  FaRegListAlt,
  FaClipboardList,
} from 'react-icons/fa';
import styles from './UserProfilePage.module.css';
import { useAuth } from '../../context/AuthContext';
import { fetchGroupService } from '../../services/group.services';
import Spinner from '../../components/Loader/Spinner/Spinner';
import { MdGroups } from 'react-icons/md';

const fadeStagger = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
};

export default function UserProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [groupInfo, setGroupInfo] = useState(null);
  const [loadingGroup, setLoadingGroup] = useState(false);
  const [groupErr, setGroupErr] = useState(null);

  /* ───────────────────────── Fetch group once ───────────────────────── */
  useEffect(() => {
    if (!user?.group) return;
    setLoadingGroup(true);
    fetchGroupService(user.group)
      .then((res) => setGroupInfo(res.data))
      .catch((err) => setGroupErr(err.message ?? 'Could not load group'))
      .finally(() => setLoadingGroup(false));
  }, [user?.group]);

  /* ─────────────────────────  User info cards ───────────────────────── */
  const {
    name,
    matricNumber,
    level,
    department,
    faculty,
    email,
    username,
    role,
    isEmailVerified,
    isLoggedIn,
    isNewUser,
    profilePicture,
    createdAt,
    updatedAt,
  } = user;

  const infoCards = [
    { label: 'Matric No.', value: matricNumber, icon: FaIdBadge },
    { label: 'Level', value: level, icon: FaGraduationCap },
    { label: 'Department', value: department, icon: FaBuilding },
    { label: 'Faculty', value: faculty, icon: FaLayerGroup },
    { label: 'Username', value: username, icon: FaUser },
    {
      label: 'Email',
      value: email,
      icon: FaEnvelope,
      suffix: isEmailVerified ? (
        <FaCheckCircle
          className={styles.verified}
          title="Verified"
        />
      ) : (
        <FaExclamationCircle
          className={styles.unverified}
          title="Not verified"
        />
      ),
    },
    { label: 'Role', value: role.replace('-', ' '), icon: FaUserPlus },
    { label: 'Group ID', value: user.group ?? '—', icon: FaLayerGroup },
    {
      label: 'Account Status',
      value: isLoggedIn ? 'Online' : 'Offline',
      icon: FaSignInAlt,
    },
    { label: 'New User?', value: isNewUser ? 'Yes' : 'No', icon: FaClock },
    {
      label: 'Joined',
      value: new Date(createdAt).toLocaleDateString(),
      icon: FaClock,
    },
    {
      label: 'Last Update',
      value: new Date(updatedAt).toLocaleString(),
      icon: FaClock,
    },
  ];

  /* ─────────────────────────  Helpers  ───────────────────────── */
  const SafeArray = (arr) => (Array.isArray(arr) ? arr : []);

  const Schedules = SafeArray(groupInfo?.schedules);
  const Attendances = SafeArray(groupInfo?.attendances);

  /* ╔═══════════════════════  Render  ═══════════════════════╗ */
  return (
    <motion.section
      className={styles.container}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
      }}>
      {/* ← Go Back */}
      <button
        className={styles.backBtn}
        onClick={() => navigate(-1)}>
        <FaArrowLeft className={styles.backIcon} /> Go Back
      </button>

      {/* ─────────── Profile header ─────────── */}
      <motion.header
        className={styles.header}
        variants={fadeStagger}>
        <motion.img
          src={profilePicture || `/main_${role}_avatar.png`}
          alt={`${name} avatar`}
          className={styles.avatar}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
        />
        <div className={styles.meta}>
          <h1 className={styles.name}>{name}</h1>
          <span className={styles.role}>{role}</span>
        </div>
      </motion.header>

      {/* ───────────  Info grid  ─────────── */}
      <motion.div className={styles.grid}>
        {infoCards.map(({ label, value, icon: Icon, suffix }, i) => (
          <motion.div
            key={label}
            className={styles.card}
            custom={i}
            variants={fadeStagger}
            whileHover={{ y: -4 }}>
            <Icon className={styles.icon} />
            <div className={styles.cardBody}>
              <span className={styles.cardLabel}>{label}</span>
              <span className={styles.cardValue}>{value}</span>
            </div>
            {suffix}
          </motion.div>
        ))}
      </motion.div>

      {/* ─────────── 1. GROUP SECTION ─────────── */}
      {user.group && (
        <motion.section
          className={styles.subsection}
          variants={fadeStagger}>
          <h2 className={styles.sectionTitle}>
            <MdGroups style={{ marginRight: 6 }} /> Group
          </h2>

          {loadingGroup ? (
            <Spinner
              size="25px"
              borderWidth="2px"
            />
          ) : groupErr ? (
            <p className={styles.error}>{groupErr}</p>
          ) : groupInfo ? (
            <>
              {groupInfo.bannerUrl && (
                <img
                  src={groupInfo.bannerUrl}
                  alt="group banner"
                  className={styles.banner}
                />
              )}

              <div className={styles.groupGrid}>
                <div>
                  <strong>Name:</strong> {groupInfo.groupName}
                </div>
                <div>
                  <strong>Course:</strong> {groupInfo.course}
                </div>
                <div>
                  <strong>Faculty:</strong> {groupInfo.faculty}
                </div>
                <div>
                  <strong>Department:</strong> {groupInfo.department}
                </div>
                <div>
                  <strong>Level:</strong> {groupInfo.level}
                </div>
                <div>
                  <strong>Members:</strong>{' '}
                  {SafeArray(groupInfo.members).length}
                </div>
                <div>
                  <strong>Visibility:</strong> {groupInfo.visibility}
                </div>
                <div>
                  <strong>Attendance Policy:</strong>
                  &nbsp;{groupInfo.attendancePolicy?.minPercentage ?? '--'}% min
                </div>
              </div>

              {groupInfo.description && (
                <p className={styles.groupDesc}>{groupInfo.description}</p>
              )}
            </>
          ) : (
            <p>No group data found.</p>
          )}
        </motion.section>
      )}

      <motion.section
        className={styles.subsection}
        variants={fadeStagger}>
        <h2 className={styles.sectionTitle}>
          <FaCalendarAlt style={{ marginRight: 6 }} /> Schedules
        </h2>

        {loadingGroup ? (
          <Spinner
            size="25px"
            borderWidth="2px"
          />
        ) : Schedules.length ? (
          <div className={styles.scheduleGrid}>
            {Schedules.map((sch, idx) => (
              <div
                key={sch._id ?? idx}
                className={styles.scheduleCard}>
                <h4>{sch.title ?? `Schedule #${idx + 1}`}</h4>
                <p>
                  {sch.day ?? sch.date ?? '—'} &nbsp;|&nbsp;
                  {sch.startTime ?? '--'} – {sch.endTime ?? '--'}
                </p>
                {sch.venue && (
                  <p>
                    <em>{sch.venue}</em>
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No schedules yet.</p>
        )}
      </motion.section>

      <motion.section
        className={styles.subsection}
        variants={fadeStagger}>
        <h2 className={styles.sectionTitle}>
          <FaClipboardList style={{ marginRight: 6 }} /> Attendance
        </h2>

        {loadingGroup ? (
          <Spinner
            size="25px"
            borderWidth="2px"
          />
        ) : Attendances.length ? (
          <ul className={styles.attendanceList}>
            {Attendances.map((att, idx) => (
              <li key={att._id ?? idx}>
                <span>{att.sessionTitle ?? `Session ${idx + 1}`}</span>
                <span className={styles.attDate}>
                  {new Date(att.date ?? att.createdAt).toLocaleDateString()}
                </span>
                <span>
                  {att.presentCount ?? 0}/{att.totalCount ?? 0}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>No attendance records yet.</p>
        )}
      </motion.section>
    </motion.section>
  );
}
