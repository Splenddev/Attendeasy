import {
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaFileAlt,
  FaFileExcel,
  FaFileArchive,
  FaFileVideo,
  FaFileAudio,
} from 'react-icons/fa';
import { AiFillFileUnknown } from 'react-icons/ai';
export const mockScheduleData = [
  {
    _id: '1',
    courseTitle: 'Introduction to Computer Science',
    courseCode: 'CS101',
    creditUnit: '3',
    lecturerName: 'Dr. Sarah Johnson',
    lecturerEmail: 'sarah.johnson@university.edu',
    classroomVenue: 'Room 204, Computer Science Building',
    department: 'Computer Science',
    faculty: 'Engineering',
    level: '100',
    classType: 'Physical',
    virtualLink: null,
    maxStudents: 150,
    classDaysTimes: [
      {
        day: 'Monday',
        timing: { startTime: '09:00', endTime: '10:30' },
      },
      {
        day: 'Wednesday',
        timing: { startTime: '09:00', endTime: '10:30' },
      },
    ],
    notes: 'Bring your laptop for practical sessions',
    isActive: true,
    allowAttendanceMarking: true,
    notificationLeadTime: 30,
    media: [
      {
        id: 'media-abc123',
        fileType: 'pdf',
        name: 'Course Syllabus.pdf',
        src: '/files/syllabus.pdf',
        dateAdded: '2025-07-01',
        timeAdded: '10:30 AM',
        approved: true,
      },
      {
        id: 'media-def456',
        fileType: 'video',
        name: 'Introduction Lecture.mp4',
        src: '/videos/intro.mp4',
        dateAdded: '2025-07-02',
        timeAdded: '2:15 PM',
        approved: true,
      },
    ],
    createdAt: '2025-07-01T10:00:00Z',
  },
  {
    _id: '2',
    courseTitle: 'Calculus I',
    courseCode: 'MATH101',
    creditUnit: '4',
    lecturerName: 'Prof. Michael Chen',
    lecturerEmail: 'michael.chen@university.edu',
    classroomVenue: 'Lecture Hall A, Mathematics Building',
    department: 'Mathematics',
    faculty: 'Science',
    level: '100',
    classType: 'Physical',
    virtualLink: null,
    maxStudents: 200,
    classDaysTimes: [
      {
        day: 'Tuesday',
        timing: { startTime: '11:00', endTime: '12:30' },
      },
      {
        day: 'Thursday',
        timing: { startTime: '11:00', endTime: '12:30' },
      },
    ],
    notes: 'Calculator required for all sessions',
    isActive: true,
    allowAttendanceMarking: true,
    notificationLeadTime: 15,
    media: [
      {
        id: 'media-ghi789',
        fileType: 'pdf',
        name: 'Chapter 1 Notes.pdf',
        src: '/files/chapter1.pdf',
        dateAdded: '2025-07-03',
        timeAdded: '9:00 AM',
        approved: true,
      },
    ],
    createdAt: '2025-07-01T11:00:00Z',
  },
  {
    _id: '3',
    courseTitle: 'English Literature',
    courseCode: 'ENG201',
    creditUnit: '3',
    lecturerName: 'Dr. Emily Watson',
    lecturerEmail: 'emily.watson@university.edu',
    classroomVenue: 'Room 301, Arts Building',
    department: 'English',
    faculty: 'Arts',
    level: '200',
    classType: 'Virtual',
    virtualLink: 'https://zoom.us/j/123456789',
    maxStudents: 80,
    classDaysTimes: [
      {
        day: 'Friday',
        timing: { startTime: '14:00', endTime: '15:30' },
      },
    ],
    notes: 'Required reading list available on course portal',
    isActive: true,
    allowAttendanceMarking: true,
    notificationLeadTime: 45,
    media: [
      {
        id: 'media-jkl012',
        fileType: 'doc',
        name: 'Reading List.docx',
        src: '/files/reading-list.docx',
        dateAdded: '2025-07-04',
        timeAdded: '3:45 PM',
        approved: true,
      },
      {
        id: 'media-mno345',
        fileType: 'audio',
        name: 'Poetry Analysis.mp3',
        src: '/audio/poetry.mp3',
        dateAdded: '2025-07-05',
        timeAdded: '1:20 PM',
        approved: true,
      },
    ],
    createdAt: '2025-07-01T12:00:00Z',
  },
];

export const formatTime = (time) => {
  const [hour, minute] = time.split(':');
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date(0, 0, 0, hour, minute));
};

export const getFileIconClass = (ext) => {
  switch (ext) {
    case 'pdf':
      return { icon: FaFilePdf, color: '#e74c3c' };
    case 'doc':
    case 'docx':
      return { icon: FaFileWord, color: '#2b7cd3' };
    case 'xls':
    case 'xlsx':
      return { icon: FaFileExcel, color: '#27ae60' };
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
      return { icon: FaFileImage, color: '#f39c12' };
    case 'zip':
    case 'rar':
    case '7z':
      return { icon: FaFileArchive, color: '#8e44ad' };
    case 'mp4':
    case 'mov':
    case 'avi':
    case 'webm':
    case 'video':
      return { icon: FaFileVideo, color: '#d35400' };
    case 'mp3':
    case 'audio':
    case 'wav':
    case 'ogg':
      return { icon: FaFileAudio, color: '#16a085' };
    case 'txt':
    case 'md':
      return { icon: FaFileAlt, color: '#95a5a6' };
    default:
      return { icon: AiFillFileUnknown, color: '#7f8c8d' };
  }
};
