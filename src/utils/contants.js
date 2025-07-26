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
        name: 'courseCode',
        title: 'Course Code',
        type: 'input',
        input: { type: 'text', placeholder: 'Select a schedule' },
        required: true,
        disabled: true,
        readOnly: true,
      },
      {
        name: 'courseTitle',
        title: 'Course Title',
        type: 'input',
        input: { type: 'text', placeholder: 'Select a schedule' },
        required: true,
        disabled: true,
        readOnly: true,
      },
    ],
  },
  {
    id: 'session-basics',
    title: 'Schedule Basics',
    selectOptions: [
      {
        name: 'groupId',
        title: 'Group ID',
        type: 'input',
        input: { type: 'text', placeholder: 'Select a schedule' },
        required: true,
        disabled: true,
        readOnly: true,
        catenate: true,
      },
      {
        name: 'scheduleId',
        title: 'Schedule ID',
        type: 'input',
        input: { type: 'text', placeholder: 'Select a schedule' },
        required: true,
        catenate: true,
        disabled: true,
        readOnly: true,
      },
      {
        name: 'classDate',
        title: 'Date',
        type: 'input',
        input: { type: 'date' },
        required: true,
      },
      {
        name: 'classTime.start',
        title: 'Start',
        type: 'input',
        input: { type: 'time' },
        required: true,
      },
      {
        name: 'classTime.end',
        title: 'End',
        type: 'input',
        input: { type: 'time' },
        required: true,
      },
    ],
  },

  /* ─────────── Location & Geofence ─────────── */
  {
    id: 'location',
    title: 'Class Location',
    selectOptions: [
      {
        name: 'location.latitude',
        title: 'Latitude',
        type: 'input',
        input: { type: 'number', step: '0.000001', placeholder: 'e.g. 6.5244' },
        required: true,
      },
      {
        name: 'location.longitude',
        title: 'Longitude',
        type: 'input',
        input: { type: 'number', step: '0.000001', placeholder: 'e.g. 3.3792' },
        required: true,
      },
      {
        name: 'location.radiusMeters',
        title: 'Radius (m)',
        type: 'input',
        required: true,
        input: { type: 'range' },
      },
    ],
  },

  /* ─────────── Entry Window ─────────── */
  {
    id: 'entry-window',
    title: 'Entry Window',
    selectOptions: [
      {
        name: 'entry.start',
        title: 'Marking Opens',
        type: 'select',
        options: [
          { text: 'At class start', value: '0H0M' },
          { text: '5 min after start', value: '0H5M' },
          { text: '10 min after start', value: '0H10M' },
          { text: '30 min after start', value: '0H30M' },
        ],
        required: true,
      },
      {
        name: 'entry.end',
        title: 'Marking Closes',
        type: 'select',
        options: [
          { text: '30 min window', value: '0H30M' },
          { text: '1 hour window', value: '1H0M' },
          { text: '1h 30min window', value: '1H30M' },
          { text: 'Full class duration', value: 'FULL' },
        ],
        required: true,
      },
    ],
  },

  /* ─────────── Marking Configuration ─────────── */
  {
    id: 'marking-config',
    title: 'Marking Configuration',
    selectOptions: [
      {
        name: 'attendanceType',
        title: 'Attendance Type',
        type: 'select',
        options: ['physical', 'virtual'],
        required: true,
      },
      {
        name: 'markingConfig.type',
        title: 'Detail Level',
        type: 'select',
        options: [
          { text: 'Strict (Present / Absent)', value: 'strict' },
          { text: 'Detailed (On‑time / Late / etc.)', value: 'detailed' },
        ],
        required: true,
      },
      {
        name: 'markingConfig.mode',
        title: 'Marking Mode',
        type: 'select',
        options: [
          { text: 'No Code (geo or click)', value: 'no_code' },
          { text: 'Requires One‑Time Code', value: 'code' },
        ],
        required: true,
      },
    ],
  },

  {
    id: 'lecturer-info',
    title: 'Lecturer (auto‑filled from schedule, editable)',
    selectOptions: [
      {
        name: 'lecturer.name',
        title: 'Name',
        type: 'input',
        input: { type: 'text', placeholder: 'e.g. Dr Adaobi Eze' },
        required: false,
        readOnly: true,
      },
      {
        name: 'lecturer.email',
        title: 'Email',
        type: 'input',
        input: { type: 'email', placeholder: 'e.g. adaobi@school.edu' },
        required: false,
        readOnly: true,
      },
    ],
  },

  /* ─────────── Optional Notes ─────────── */
  {
    id: 'notes',
    title: 'Session Notes (optional)',
    selectOptions: [
      {
        name: 'notes',
        title: 'Notes',
        type: 'input',
        input: {
          type: 'text',
          placeholder: 'e.g. First lecture; high turnout expected',
        },
        required: false,
      },
    ],
  },
  {
    id: 'auto-finalization',
    title: 'Auto Finalization',
    selectOptions: [
      {
        name: 'autoEnd',
        title: 'Auto-End Attendance',
        type: 'toggle',
        orientation: 'horizontal',
        required: true,
      },
    ],
  },
  {
    id: 'advanced-settings',
    title: 'Advanced Settings',
    selectOptions: [
      {
        name: 'settings.markOnce',
        title: 'Allow Only One Marking Per Student',
        type: 'toggle',
        orientation: 'horizontal',
        required: true,
      },
      {
        name: 'settings.allowLateJoiners',
        title: 'Allow Late Joiners to Mark',
        type: 'toggle',
        orientation: 'horizontal',
        required: true,
      },
      {
        name: 'settings.enableCheckInOut',
        title: 'Enable Check-Out Feature',
        type: 'toggle',
        orientation: 'horizontal',
        required: true,
      },
      {
        name: 'settings.allowEarlyCheckIn',
        title: 'Allow Early Check-In',
        type: 'toggle',
        orientation: 'horizontal',
        required: true,
      },
      {
        name: 'settings.allowLateCheckIn',
        title: 'Allow Late Check-In',
        type: 'toggle',
        orientation: 'horizontal',
        required: true,
      },
      {
        name: 'settings.allowEarlyCheckOut',
        title: 'Allow Early Check-Out',
        dependsOn: 'settings.enableCheckInOut',
        dependsOnKey: 'enabled',
        type: 'toggle',
        orientation: 'horizontal',
        required: true,
      },
      {
        name: 'settings.allowLateCheckOut',
        title: 'Allow Late Check-Out',
        dependsOnKey: 'enabled',
        dependsOn: 'settings.enableCheckInOut',
        type: 'toggle',
        orientation: 'horizontal',
        required: true,
      },
      {
        name: 'settings.repeatable',
        title: 'Recurring Session?',
        type: 'toggle',
        orientation: 'horizontal',
        required: true,
      },
      {
        name: 'settings.notifyOnStart',
        title: 'Notify Students on Start',
        type: 'toggle',
        orientation: 'horizontal',
        required: true,
      },
      {
        name: 'settings.minimumPresenceDuration',
        title: 'Minimum Presence Duration (mins)',
        type: 'input',
        input: {
          type: 'number',
          min: 5,
          max: 180,
          placeholder: 'e.g. 45',
        },
        required: true,
      },
      {
        name: 'settings.proofRequirement',
        title: 'Proof Requirement',
        type: 'select',
        options: [
          { text: 'None', value: 'none' },
          { text: 'Selfie Required', value: 'selfie' },
        ],
        required: true,
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
