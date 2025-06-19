export const courseCodeOptions = [
  { text: 'BCH301' },
  { text: 'BCH303' },
  { text: 'BCH305' },
  { text: 'BCH315' },
  { text: 'BCH317' },
];
export const formDataAssets2 = [
  {
    id: 'optional-enhancements',
    title: 'Optional Enhancements',
    selectOptions: [
      {
        title: 'Reminders',
        choices: ['Email', 'Notifications'],
        type: 'choice',
        choiceMode: 'single',
      },
      {
        title: 'Absence Plea',
        choices: ['None', 'Text', 'Photo Proof'],
        type: 'choice',
        choiceMode: 'single',
      },
      {
        title: 'Export Format',
        choices: ['PDF', 'Excel ', 'DOCX', 'All'],
        type: 'choice',
        choiceMode: 'single',
      },
    ],
  },
  {
    id: 'tracking',
    title: 'Tracking',
    selectOptions: [
      {
        title: 'Location',
        type: 'input',
        input: {
          type: 'text',
          placeholder: 'e.g. Main Auditorium',
        },
      },
      {
        title: 'Entry Range',
        type: 'input',
        input: { type: 'range' },
      },
    ],
  },
];
export const formDataAssets = [
  {
    id: 'course-info',
    title: 'Course Info',
    selectOptions: [
      {
        title: 'Course Code',
        options: courseCodeOptions,
        type: 'select',
        required: true,
      },
      {
        title: 'Course Title',
        type: 'input',
        input: {
          type: 'text',
          placeholder: 'e.g. Analytical Biochemistry',
        },
        required: true,
      },
      {
        title: 'Unit',
        options: [0, 1, 2, 3, 4, 5],
        type: 'select',
        required: true,
      },
      {
        title: 'Semester',
        options: ['First', 'Second'],
        type: 'select',
        required: true,
      },
    ],
  },
  {
    id: 'lecturer-info',
    title: 'Lecturer Info',
    selectOptions: [
      {
        title: 'Name',
        type: 'input',
        input: { type: 'text', placeholder: 'eg. Mr. John Doe' },
        required: true,
      },
      {
        title: 'Email',
        type: 'input',
        input: {
          type: 'email',
          placeholder: 'eg. johndoe123@gmail.com',
        },
        required: true,
      },
    ],
  },
  {
    id: 'timing',
    title: 'Timing',
    selectOptions: [
      {
        title: 'Class Start',
        type: 'input',
        input: { type: 'time' },
        required: true,
      },
      {
        title: 'Class End',
        type: 'input',
        input: { type: 'time' },
        required: true,
      },
      {
        title: 'Entry Start',
        type: 'select',
        options: [
          { text: '10 min after class start', value: '0H10M' },
          { text: '30 min after class start', value: '0H30M' },
          { text: '1 hr after class start', value: '1H0M' },
          { text: '1 hr 30 min after class start', value: '1H30M' },
          { text: 'Manual' },
        ],
        required: true,
      },
      {
        required: true,
        title: 'Entry End',
        type: 'select',
        options: [
          { text: '10 min after entry start', value: '0H10M' },
          { text: '30 min after entry start', value: '0H30M' },
          { text: '1 hr after entry start', value: '1H0M' },
          { text: '1 hr 30 min after entry start', value: '1H30M' },
          { text: 'Manual' },
        ],
      },
      {
        title: 'Date',
        type: 'input',
        required: true,
        input: { type: 'date' },
      },
    ],
  },
  {
    id: 'marking',
    title: 'Marking',
    selectOptions: [
      {
        required: true,
        title: 'Type',
        options: ['Strict ( P / A only )', 'Detailed ( P / A / L )'],
        type: 'select',
      },
      {
        title: 'Mode',
        options: ['No Code', 'Code'],
        required: true,
        type: 'select',
      },
      {
        required: true,
        title: 'Other Types',
        type: 'choice',
        choices: [
          'C - Conference / Official Duty',
          'E - Excused',
          'F - Family Emergency',
          'M - Medical',
          'O - Others (Speciify)',
          'P - Personal Reasons',
          'R - Religious Observance',
          'S - Suspension',
          'T - Travel',
        ],
        choiceMode: 'multiple',
      },
    ],
  },
];
export const list = [
  {
    name: 'Splendid Felix',
    role: 'class-rep',
  },
  {
    name: 'Amad Ali',
    role: 'student',
  },
  {
    name: 'Ben Kardi',
    role: 'student',
  },
  {
    name: 'Angel Johnson',
    role: 'student',
  },
  {
    name: 'Alex Khan',
    role: 'student',
  },
  {
    name: 'Cardi Johnson',
    role: 'student',
  },
  {
    name: 'Carly Stones',
    role: 'student',
  },
  {
    name: 'John Khan',
    role: 'student',
  },
  {
    name: 'Aohn Khan Mohameed',
    role: 'student',
  },
];

export const variants = {
  shake: {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 },
    },
    still: { x: 0 },
  },
  blink: {
    blink: {
      opacity: [0, 0.1, 1, -0.1, 1, 0],
      transition: { duration: 1, delay: 0.5 },
    },
    still: { opacity: 0 },
  },
};
export const group = {
  name: 'CSC 301 - Data Structures',
  faculty: 'Science',
  department: 'Computer Science',
  level: '300',
  classRepName: 'Jane Doe',
  description:
    'This group handles all communications and activities for CSC 301. Ensure you keep up with announcements and attendance.',
  members: [
    {
      id: 1,
      name: 'Jane Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'Class Rep',
    },
    {
      id: 2,
      name: 'John Smith',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'Student',
    },
    {
      id: 3,
      name: 'Mary Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'Student',
    },
    {
      id: 4,
      name: 'Mike Brown',
      avatar: 'https://i.pravatar.cc/150?img=4',
      role: 'Student',
    },
  ],

  // New fields added for OverviewTab compatibility:
  joinedStudents: [
    { id: 2, name: 'John Smith' },
    { id: 3, name: 'Mary Johnson' },
    { id: 4, name: 'Mike Brown' },
  ],
  leftStudents: [{ id: 5, name: 'Chris Walker' }],

  completedClasses: 12,
  submittedAttendance: 11,

  attendanceRecords: [
    {
      date: '2025-06-01',
      presentStudentIds: [1, 2, 3], // Jane, John, Mary
    },
    {
      date: '2025-06-03',
      presentStudentIds: [1, 2, 4], // Jane, John, Mike
    },
    {
      date: '2025-06-05',
      presentStudentIds: [1, 2], // Jane, John
    },
    {
      date: '2025-06-10',
      presentStudentIds: [1, 3, 4], // Jane, Mary, Mike
    },
  ],

  lastAttendanceDate: '2025-06-10T09:00:00Z',

  attendanceTrends: [5, 20, 35, 38, 36, 40], // Total students present over recent classes

  topAbsentees: [
    { name: 'Mary Johnson', count: 4 },
    { name: 'Mike Brown', count: 3 },
  ],

  engagementStats: {
    announcements: 6,
    acknowledgements: 75,
  },

  nextClass: {
    day: 'Wednesday',
    time: '10:00 AM – 12:00 PM',
    topic: 'Stacks and Queues',
    location: 'Lecture Room 5, CS Building',
  },

  latestAnnouncement: {
    title: 'Midterm Review Class',
    body: 'There will be a special review session this Friday covering all topics from weeks 1–6. Attendance is highly recommended.',
    postedAt: '2025-06-10T14:30:00Z',
  },
  announcements: [
    {
      id: 1,
      title: 'Midterm Review Class',
      body: 'There will be a special review session this Friday covering all topics from weeks 1–6. Attendance is highly recommended.',
      postedAt: '2025-06-10T14:30:00Z',
      type: 'class', // 📘 Class Info
    },
    {
      id: 2,
      title: 'Assignment 2 Deadline',
      body: 'Submit your second assignment on Linked Lists by Sunday night. Late submissions will incur penalties.',
      postedAt: '2025-06-11T10:00:00Z',
      type: 'assignment', // 📚 Assignment Reminder
    },
    {
      id: 3,
      title: 'Media Upload Notice',
      body: 'Lecture recording for Week 5 has been uploaded. Access it from the materials section.',
      postedAt: '2025-06-09T16:45:00Z',
      type: 'media', // 🎥 Media Notice
    },
    {
      id: 4,
      title: 'No Class Next Monday',
      body: 'Due to a public holiday, there will be no class next Monday. Use the time to revise.',
      postedAt: '2025-06-08T12:00:00Z',
      type: 'general', // 🗓 General Announcement
    },
  ],
};
