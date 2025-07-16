import { FaGraduationCap } from 'react-icons/fa';
import {
  MdDescription,
  MdEvent,
  MdLibraryBooks,
  MdMessage,
  MdPerson,
  MdTimelapse,
  MdTimer,
  MdNumbers,
  MdAssignment,
  MdNotifications,
  MdPhotoCamera,
  MdUploadFile,
  MdLocationOn,
  MdStraighten,
  MdGroup,
  MdViewModule,
  MdPhonelinkLock,
  MdWifi,
  MdAccessTime,
  MdCached,
  MdCampaign,
  MdPolicy,
} from 'react-icons/md';

export const infoModalContent = [
  {
    id: 'course-info',
    title: 'Course Info',
    points: [
      {
        icon: MdLibraryBooks,
        text: 'Course Code: Auto-filled from the selected schedule (e.g., BCH301).',
      },
      {
        icon: MdDescription,
        text: 'Course Title: Auto-filled from the selected schedule (e.g., Analytical Biochemistry).',
      },
    ],
  },
  {
    id: 'session-basics',
    title: 'Schedule Basics',
    points: [
      {
        icon: MdGroup,
        text: 'Group ID: Automatically assigned from schedule context.',
      },
      {
        icon: MdLibraryBooks,
        text: 'Schedule ID: Unique schedule this session is derived from.',
      },
      {
        icon: MdEvent,
        text: 'Class Date: The calendar day this session will hold.',
      },
      {
        icon: MdTimelapse,
        text: 'Day: Expected day of the week for the session.',
      },
      {
        icon: MdTimer,
        text: 'Start & End: Time range the class will be active.',
      },
    ],
  },
  {
    id: 'location',
    title: 'Class Location',
    points: [
      {
        icon: MdLocationOn,
        text: 'Latitude & Longitude: GPS coordinates of the class venue.',
      },
      {
        icon: MdStraighten,
        text: 'Radius (m): Geofence boundary for valid attendance check-ins.',
      },
    ],
  },
  {
    id: 'entry-window',
    title: 'Entry Window',
    points: [
      {
        icon: MdTimelapse,
        text: 'Marking Opens: When students are first allowed to check in (relative to start time).',
      },
      {
        icon: MdTimer,
        text: 'Marking Closes: How long the window stays open (e.g., 30 mins or full class).',
      },
    ],
  },
  {
    id: 'marking-config',
    title: 'Marking Configuration',
    points: [
      {
        icon: MdLibraryBooks,
        text: 'Attendance Type: Specify if session is physical (location locked) or virtual.',
      },
      {
        icon: MdNumbers,
        text: 'Detail Level: Choose between strict (Present/Absent) or detailed (Late, Left Early).',
      },
      {
        icon: MdAssignment,
        text: 'Marking Mode: Code-based (requires OTP) or No Code (click or geo only).',
      },
    ],
  },
  {
    id: 'lecturer-info',
    title: 'Lecturer',
    points: [
      {
        icon: MdPerson,
        text: 'Name: Auto-filled from schedule, read-only.',
      },
      {
        icon: MdMessage,
        text: 'Email: Auto-filled for future notification and export use.',
      },
    ],
  },
  {
    id: 'notes',
    title: 'Session Notes',
    points: [
      {
        icon: MdDescription,
        text: 'Notes: Additional context like “first lecture,” “practical session,” etc.',
      },
    ],
  },
  {
    id: 'auto-finalization',
    title: 'Auto Finalization',
    points: [
      {
        icon: MdTimer,
        text: 'Auto-End Attendance: Whether the session automatically finalizes when time is up.',
      },
    ],
  },
  {
    id: 'advanced-settings',
    title: 'Advanced Settings',
    points: [
      {
        icon: MdPolicy,
        text: 'Mark Once: Prevent multiple attendance entries from a student.',
      },
      {
        icon: MdGroup,
        text: 'Allow Late Joiners: Can students who joined the group after creation participate?',
      },
      {
        icon: MdPhonelinkLock,
        text: 'Device Lock: One mark per unique device.',
      },
      {
        icon: MdWifi,
        text: 'IP Restriction: Restrict one attendance mark per IP network.',
      },
      {
        icon: MdCached,
        text: 'Recurring Session: Automatically repeat this session weekly.',
      },
      {
        icon: MdNotifications,
        text: 'Notify On Start: Send email or push notification when session begins.',
      },
      {
        icon: MdAccessTime,
        text: 'Minimum Presence Duration: Student must remain present for a minimum duration (e.g., 45 mins) to be counted.',
      },
    ],
  },
];
