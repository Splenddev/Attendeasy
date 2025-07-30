// GroupCloudTab.jsx
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  FaFilePdf,
  FaVideo,
  FaImage,
  FaLink,
  FaFileAudio,
  FaFileWord,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import gsap from 'gsap';
import styles from './GroupCloudTab.module.css';
import { MdAssessment } from 'react-icons/md';

const iconMap = {
  pdf: <FaFilePdf color="#D32F2F" />,
  video: <FaVideo color="#1976D2" />,
  image: <FaImage color="#388E3C" />,
  link: <FaLink color="#F9A825" />,
  audio: <FaFileAudio color="#6A1B9A" />,
  doc: <FaFileWord color="#1565C0" />,
};

const dummyData = [
  {
    id: 'media-a1f3',
    fileType: 'pdf',
    allowedExt: ['pdf'],
    src: 'https://res.cloudinary.com/demo/raw/upload/v1690000000/intro-to-algorithms.pdf',
    name: 'Intro to Algorithms - Week 1',
    dateAdded: '2025-06-24',
    cloudinaryId: 'raw/upload/v1690000000/intro-to-algorithms',
    resourceType: 'raw',
    timeAdded: '09:15 AM',
    uploadedBy: '64b1234567fabcde90123456',
    uploadedAt: '2025-06-24T08:15:00Z',
    approved: true,
  },
  {
    id: 'media-df9e',
    fileType: 'video',
    allowedExt: ['mp4', 'mov'],
    src: 'https://res.cloudinary.com/demo/video/upload/v1690001234/lecture1-intro.mp4',
    name: 'Lecture 1 - Course Overview',
    dateAdded: '2025-06-25',
    cloudinaryId: 'video/upload/v1690001234/lecture1-intro',
    resourceType: 'video',
    timeAdded: '10:00 AM',
    uploadedBy: '64b6543210fabcde90123456',
    uploadedAt: '2025-06-25T09:00:00Z',
    approved: true,
  },
  {
    id: 'media-c3b1',
    fileType: 'image',
    allowedExt: ['jpg', 'png'],
    src: 'https://res.cloudinary.com/demo/image/upload/v1690002345/diagram-ch1.png',
    name: 'Chapter 1 Diagram',
    dateAdded: '2025-06-25',
    cloudinaryId: 'image/upload/v1690002345/diagram-ch1',
    resourceType: 'image',
    timeAdded: '12:30 PM',
    uploadedBy: '64babcdef01234567890abcd',
    uploadedAt: '2025-06-25T11:30:00Z',
    approved: true,
  },
  {
    id: 'media-a792',
    fileType: 'link',
    allowedExt: [],
    src: 'https://www.khanacademy.org/computer-science',
    name: 'External Learning Resource - Khan Academy',
    dateAdded: '2025-06-26',
    cloudinaryId: 'external/link/khanacademy',
    resourceType: 'raw',
    timeAdded: '01:45 PM',
    uploadedBy: '64bbcdef01234567890abcd1',
    uploadedAt: '2025-06-26T12:45:00Z',
    approved: false,
  },
  {
    id: 'media-fb3d',
    fileType: 'audio',
    allowedExt: ['mp3', 'wav'],
    src: 'https://res.cloudinary.com/demo/video/upload/v1690005678/audio-summary.mp3',
    name: 'Lecture Summary - Audio',
    dateAdded: '2025-06-27',
    cloudinaryId: 'video/upload/v1690005678/audio-summary',
    resourceType: 'video',
    timeAdded: '03:20 PM',
    uploadedBy: '64b3210987fedcba09876543',
    uploadedAt: '2025-06-27T14:20:00Z',
    approved: true,
  },
  {
    id: 'media-eb8c',
    fileType: 'doc',
    allowedExt: ['docx', 'doc'],
    src: 'https://res.cloudinary.com/demo/raw/upload/v1690006789/assignment-template.docx',
    name: 'Assignment Template',
    dateAdded: '2025-06-27',
    cloudinaryId: 'raw/upload/v1690006789/assignment-template',
    resourceType: 'raw',
    timeAdded: '04:50 PM',
    uploadedBy: '64beeeed0987654321123456',
    uploadedAt: '2025-06-27T15:50:00Z',
    approved: true,
  },
];

const GroupCloudTab = () => {
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [approvedFilter, setApprovedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dateAddedDesc');
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
  }, []);

  const filteredResources = useMemo(() => {
    return dummyData
      .filter(
        (res) => fileTypeFilter === 'all' || res.fileType === fileTypeFilter
      )
      .filter(
        (res) =>
          approvedFilter === 'all' ||
          (approvedFilter === 'approved' ? res.approved : !res.approved)
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'nameAsc':
            return a.name.localeCompare(b.name);
          case 'nameDesc':
            return b.name.localeCompare(a.name);
          case 'dateAddedAsc':
            return new Date(a.dateAdded) - new Date(b.dateAdded);
          default:
            return new Date(b.dateAdded) - new Date(a.dateAdded);
        }
      });
  }, [fileTypeFilter, approvedFilter, sortBy]);

  const summary = useMemo(() => {
    const total = dummyData.length;
    const approved = dummyData.filter((r) => r.approved).length;
    const byType = dummyData.reduce((acc, curr) => {
      acc[curr.fileType] = (acc[curr.fileType] || 0) + 1;
      return acc;
    }, {});
    return { total, approved, byType };
  }, []);

  return (
    <div
      className={styles.page}
      ref={pageRef}>
      <h1 className={styles.heading}>
        <MdAssessment /> Class Resources
      </h1>

      <section className={styles.analytics}>
        <div className={styles.card}>Total: {summary.total}</div>
        <div className={styles.card}>Approved: {summary.approved}</div>
        <div className={styles.card}>
          By Type:
          <ul>
            {Object.entries(summary.byType).map(([type, count]) => (
              <li key={type}>
                {type}: {count}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.filters}>
        <select
          value={fileTypeFilter}
          onChange={(e) => setFileTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="pdf">PDF</option>
          <option value="video">Video</option>
          <option value="image">Image</option>
          <option value="link">Link</option>
          <option value="audio">Audio</option>
          <option value="doc">Doc</option>
        </select>

        <select
          value={approvedFilter}
          onChange={(e) => setApprovedFilter(e.target.value)}>
          <option value="all">All Approval</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}>
          <option value="dateAddedDesc">Newest First</option>
          <option value="dateAddedAsc">Oldest First</option>
          <option value="nameAsc">A-Z</option>
          <option value="nameDesc">Z-A</option>
        </select>
      </section>

      <section className={styles.resourceList}>
        {filteredResources.length === 0 ? (
          <p>No resources found.</p>
        ) : (
          filteredResources.map((res, idx) => (
            <div
              className={styles.resourceCard}
              key={res.id || idx}>
              <div className={styles.icon}>{iconMap[res.fileType]}</div>
              <div className={styles.info}>
                <h3>{res.name}</h3>
                <p>
                  <strong>Type:</strong> {res.fileType}
                </p>
                <p>
                  <strong>Date:</strong> {res.dateAdded} at {res.timeAdded}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  {res.approved ? (
                    <FaCheckCircle color="green" />
                  ) : (
                    <FaTimesCircle color="red" />
                  )}
                </p>
              </div>
              <a
                className={styles.download}
                href={res.src}
                target="_blank"
                rel="noreferrer">
                View
              </a>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default GroupCloudTab;
