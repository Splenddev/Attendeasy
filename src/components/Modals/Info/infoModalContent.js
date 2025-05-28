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
} from 'react-icons/md';

export const infoModalContent = [
  {
    id: 'course-info',
    title: 'Course Information',
    points: [
      {
        icon: MdLibraryBooks,
        text: 'Course Code: Select the unique identifier for the course (e.g., BCH301, BCH303).',
      },
      {
        icon: MdDescription,
        text: 'Course Title: Enter the official name of the course (e.g., Analytical Biochemistry).',
      },
      {
        icon: FaGraduationCap,
        text: 'Credit Units: Number of credits assigned to this course (0 to 5).',
      },
      {
        icon: MdEvent,
        text: 'Semester: Select the academic period in which the course is offered (First or Second).',
      },
    ],
  },
  {
    id: 'lecturer-info',
    title: 'Instructor Details',
    points: [
      {
        icon: MdPerson,
        text: 'Lecturer Name: Enter the official name of the instructor (e.g., Mr. John Doe).',
      },
      {
        icon: MdMessage,
        text: `Email Address: Lecturer's email for direct emailing of attendance sheets (e.g., johndoe123@gmail.com).`,
      },
    ],
  },
  {
    id: 'timing',
    title: 'Class Schedule',
    points: [
      {
        icon: MdTimer,
        text: 'Class Start & End Time: Specify when lectures commence and conclude.',
      },
      {
        icon: MdTimelapse,
        text: `Attendance Entry Window:
Define the timeframe students can mark attendance.

Entry Start: Choose when students can start marking attendance:

10 min, 30 min, or 1 hr after class start: Automatically opens attendance after the specified time.

Manual: You’ll manually start the attendance window when ready.

Entry End: Choose when attendance closes:

Options are relative to entry start (e.g., 10 min after it begins).

Manual: You’ll manually stop the attendance at your chosen time.`,
      },
      {
        icon: MdEvent,
        text: 'Date: Select the date of the lecture session.',
      },
    ],
  },
  {
    id: 'marking',
    title: 'Attendance Tracking',
    points: [
      {
        icon: MdAssignment,
        text: `Attendance Mode:
Choose how students mark their attendance:

No Code – Students can mark attendance without entering any code.

Coded Start – A unique code is generated and required for students to enter before they can mark attendance. This adds a layer of verification.`,
      },
      {
        icon: MdNumbers,
        text: 'Marking Type: Choose between Strict (Present/Absent only) or Detailed (Present/Absent/Late).',
      },
      {
        icon: MdDescription,
        text: 'Excused/Medical Absences: Enable options for documented absences like Excused (E) or Medical (M).',
      },
    ],
  },
  {
    id: 'optional-enhancements',
    title: 'Additional Features',
    points: [
      {
        icon: MdNotifications,
        text: 'Reminders: Notify students about upcoming lectures.',
      },
      {
        icon: MdPhotoCamera,
        text: 'Proof of Absence: Require documentation for missed classes.',
      },
      {
        icon: MdUploadFile,
        text: 'Export Preferences: Choose formats to save or share attendance records.',
      },
    ],
  },
  {
    id: 'tracking',
    title: 'Location-Based Attendance',
    points: [
      {
        icon: MdLocationOn,
        text: 'Class Location: Define the official venue for lectures.',
      },
      {
        icon: MdStraighten,
        text: 'Entry Proximity: Set distance limits for attendance marking.',
      },
    ],
  },
  {
    id: 'students',
    title: 'Student Management',
    points: [
      {
        icon: MdGroup,
        text: 'Individual Selection: Manually add specific students.',
      },
      {
        icon: MdViewModule,
        text: 'Bulk Selection: Add multiple students at once or import data.',
      },
    ],
  },
];
