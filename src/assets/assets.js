import { FaClipboardList, FaTachometerAlt } from 'react-icons/fa';
import { MdGroup, MdSchedule } from 'react-icons/md';
import logo from './splendid.png';
import profile from './profile.jpg';
const roleUrl = '/class-rep';

export const assets = { logo, profile };
export const c_Sidebar = [
  {
    label: 'Dashboard',
    icon: FaTachometerAlt,
    link: `${roleUrl}/dashboard`,
  },
  {
    label: 'Attendance',
    icon: FaClipboardList,
    link: `${roleUrl}/attendance`,
  },
  {
    label: 'Class Schedules',
    icon: MdSchedule,
    link: `${roleUrl}/schedules`,
  },
  // {
  //   label: 'Class Group',
  //   icon: MdGroup,
  //   link: `${roleUrl}/schedule`,
  // },
];
export const todaySchedule = [
  {
    time: { start: '2025-05-01T14:00:00', end: '2025-05-01T16:00:00' },
    course: {
      code: 'BCH304',
      title: 'Intro to biochemistry',
      lecturer: 'Mr Bamidele',
    },
    progress: { submitted: false },
  },
  {
    time: { start: '2025-05-01T16:00:00', end: '2025-05-01T18:00:00' },
    course: {
      code: 'BCH302',
      title: 'Intro to Enzymology',
      lecturer: 'Mr Alison',
    },
    progress: { submitted: false },
  },
  {
    time: { start: '2025-05-01T22:00:00', end: '2025-05-01T23:00:00' },
    course: {
      code: 'BCH312',
      title: 'Intro to Physiology',
      lecturer: 'Mrs Ali',
    },
    progress: { submitted: true },
  },
  {
    time: { start: '2025-05-01T23:00:00', end: '2025-05-01T00:00:00' },
    course: {
      code: 'CHM312',
      title: 'Intro to Chemistry',
      lecturer: 'Mrs Lade',
    },
    progress: { submitted: true },
  },
];
export const attendance = [
  {
    Absence_Plea_choices: { Text: true },
    Class_Start: '03:29',
    Class_End: '03:27',
    Code: 'BCH302',
    Course_Title: 'Analytical Biochemistry',
    DateCreated: '2025-05-06',
    Email: 'nnhvbn@gmail.com',
    Entry_Start: '0H30M',
    Entry_End: '0H30M',
    Entry_Range: '120',
    Export_Format_choices: { All: true },
    Location: 'Auditorium',
    Mode: 'Code',
    Name: 'Mr. Adios',
    Other_Types_choices: { 'M - Medical': true },
    Reminders_choices: { Email: true },
    Semester: 'First',
    Type: 'Detailed ( P / A / L )',
    Unit: '2',
    students: [
      'Splendid Felix',
      'Amad Ali',
      'Ben Kardi',
      'Angel Johnson',
      'Alex Khan',
      'Cardi Johnson',
      'Carly Stones',
      'John Khan',
      'Aohn Khan Mohameed',
    ],
    list: [
      {
        name: 'Amad Ali',
        time: { in: '2025-05-06T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'P',
        role: 'student',
      },
      {
        name: 'Splendid Felix',
        time: { in: '2025-05-06T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'P',
        role: 'class-rep',
      },
      {
        name: 'Ben Kardi',
        time: { in: '2025-05-06T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'P',
        role: 'student',
      },
      {
        name: 'Angel Johnson',
        time: { in: '2025-05-06T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'L',
        role: 'student',
      },
      {
        name: 'Alex Khan',
        time: { in: '2025-05-06T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'A',
        role: 'student',
      },
      {
        name: 'Cardi Johnson',
        time: { in: '2025-05-06T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'L',
        role: 'student',
      },
      {
        name: 'Carly Stones',
        time: { in: '2025-05-06T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'L',
        role: 'student',
      },
      {
        name: 'John Khan',
        time: { in: '2025-05-06T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'A',
        role: 'student',
      },
      {
        name: 'Aohn Khan Mohameed',
        time: { in: '2025-05-06T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'P',
        role: 'student',
      },
    ],
  },
  {
    Absence_Plea_choices: { Text: true },
    Class_Start: '03:29',
    Class_End: '03:27',
    Code: 'BCH303',
    Course_Title: 'Analytical Biochemistry',
    DateCreated: '2025-05-05',
    Email: 'nnhvbn@gmail.com',
    Entry_Start: '0H30M',
    Entry_End: '0H30M',
    Entry_Range: '120',
    Export_Format_choices: { All: true },
    Location: 'Auditorium',
    Mode: 'Code',
    Name: 'Mr. Adios',
    Other_Types_choices: { 'M - Medical': true },
    Reminders_choices: { Email: true },
    Semester: 'First',
    Type: 'Detailed ( P / A / L )',
    Unit: '2',
    students: [
      'Becky Ali',
      'Ben Kardi',
      'Zakariya Khan Mohameed',
      'Denmark Nelson',
      'Ananias Cardi',
      'Cardi Johnson',
      'Carnoss Stones',
      'Johnny Khan',
    ],
    list: [
      {
        name: 'Becky Ali',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'P',
        role: 'student',
      },
      {
        name: 'Ben Kardi',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'P',
        role: 'student',
      },
      {
        name: 'Denmark Nelson',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'L',
        role: 'student',
      },
      {
        name: 'Ananias Cardi',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'A',
        role: 'student',
      },
      {
        name: 'Cardi Johnson',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'L',
        role: 'student',
      },
      {
        name: 'Carnoss Stones',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'L',
        role: 'student',
      },
      {
        name: 'Johnny Khan',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'A',
        role: 'student',
      },
      {
        name: 'Zakariya Khan Mohameed',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'P',
        role: 'student',
      },
    ],
  },
  {
    Absence_Plea_choices: { Text: true },
    Class_Start: '03:29',
    Class_End: '03:27',
    Code: 'BCH303',
    Course_Title: 'Analytical Biochemistry',
    DateCreated: '2025-05-06',
    Email: 'nnhvbn@gmail.com',
    Entry_Start: '0H30M',
    Entry_End: '0H30M',
    Entry_Range: '120',
    Export_Format_choices: { All: true },
    Location: 'Auditorium',
    Mode: 'Code',
    Name: 'Mrs. Amanda',
    Other_Types_choices: { 'M - Medical': true },
    Reminders_choices: { Email: true },
    Semester: 'First',
    Type: 'Detailed ( P / A / L )',
    Unit: '2',
    students: [
      'Becky Ali',
      'Ben Kardi',
      'Zakariya Khan Mohameed',
      'Denmark Nelson',
      'Ananias Cardi',
      'Cardi Johnson',
      'Carnoss Stones',
      'Johnny Khan',
    ],
    list: [
      {
        name: 'Becky Ali',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'P',
        role: 'student',
      },
      {
        name: 'Ben Kardi',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'P',
        role: 'student',
      },
      {
        name: 'Denmark Nelson',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'L',
        role: 'student',
      },
      {
        name: 'Ananias Cardi',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'A',
        role: 'student',
      },
      {
        name: 'Cardi Johnson',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'L',
        role: 'student',
      },
      {
        name: 'Carnoss Stones',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'L',
        role: 'student',
      },
      {
        name: 'Johnny Khan',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'A',
        role: 'student',
      },
      {
        name: 'Zakariya Khan Mohameed',
        time: { in: '2025-05-05T11:05:00Z', out: '2025-05-06T14:05:00Z' },
        status: 'P',
        role: 'student',
      },
    ],
  },
];

{
  /* <div className="icon">
              <FaTachometerAlt />
            </div>
            <div className="icon">
              <FaClipboardList />
            </div>
            <div className="icon">
              <MdSchedule />
            </div>
            <div className="icon">
              <MdGroup />
            </div>
            <div className="icon">
              <MdAssignment />
            </div>
            <div className="icon">
              <FaFolderOpen />
            </div>
            <div className="icon">
              <MdManageAccounts />
            </div> */
}
