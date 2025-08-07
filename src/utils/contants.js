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
        name: 'settings.markingConfig.type',
        title: 'Detail Level',
        type: 'select',
        options: [
          { text: 'Strict (Present / Absent)', value: 'strict' },
          { text: 'Detailed (On‑time / Late / etc.)', value: 'detailed' },
        ],
        required: true,
      },
      {
        name: 'settings.markingConfig.mode',
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
        title: 'Mark Only Once Per Student',
        type: 'toggle',
        orientation: 'horizontal',
        required: true,
      },

      // CHECK-IN CONTROL
      {
        name: 'settings.checkInClose',
        title: 'Auto-Close Check-In After',
        type: 'select',
        dependsOn: 'settings.enableCheckInOut',
        options: [
          { text: '10 minutes', value: '0H10M' },
          { text: '20 minutes', value: '0H20M' },
          { text: '30 minutes', value: '0H30M' },
        ],
      },
      {
        name: 'settings.lateThreshold',
        title: 'Mark Late After',
        type: 'select',
        options: [
          { text: '10 mins', value: 10 },
          { text: '20 mins', value: 20 },
          { text: '30 mins', value: 30 },
        ],
      },
      {
        name: 'settings.allowLateJoiners',
        title: 'Allow Late Joiners',
        type: 'toggle',
        orientation: 'horizontal',
        required: true,
      },

      // ENABLE CHECK-IN / OUT
      {
        name: 'settings.enableCheckInOut',
        title: 'Enable Check-Out Feature',
        type: 'toggle',
        orientation: 'horizontal',
        required: true,
      },

      // CHECK-IN SUB OPTIONS (dependent)
      {
        name: 'settings.allowEarlyCheckIn',
        title: 'Allow Early Check-In',
        type: 'toggle',
        orientation: 'horizontal',
        dependsOn: 'settings.enableCheckInOut',
        required: true,
      },
      {
        name: 'settings.allowLateCheckIn',
        title: 'Allow Late Check-In',
        type: 'toggle',
        orientation: 'horizontal',
        dependsOn: 'settings.enableCheckInOut',
        required: true,
      },

      {
        name: 'settings.allowEarlyCheckOut',
        title: 'Allow Early Check-Out',
        type: 'toggle',
        orientation: 'horizontal',
        dependsOn: 'settings.enableCheckInOut',
        required: true,
      },
      {
        name: 'settings.allowLateCheckOut',
        title: 'Allow Late Check-Out',
        type: 'toggle',
        orientation: 'horizontal',
        dependsOn: 'settings.enableCheckInOut',
        required: true,
      },

      {
        name: 'settings.minimumPresenceDuration',
        title: 'Minimum Time to Be Present (mins)',
        type: 'input',
        input: {
          type: 'number',
          min: 5,
          max: 180,
          placeholder: 'e.g. 45',
        },
        dependsOn: 'settings.enableCheckInOut',
        required: true,
      },

      // OTHER SETTINGS
      {
        name: 'settings.repeatable',
        title: 'Recurring Session',
        type: 'toggle',
        orientation: 'horizontal',
        required: true,
      },
      {
        name: 'settings.notifyOnStart',
        title: 'Notify Students at Start',
        type: 'toggle',
        orientation: 'horizontal',
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

export const coursesData = [
  {
    id: 1,
    courseTitle: 'Advanced React Development',
    instructor: { name: 'Sarah Johnson' },
    thumbnail:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
    progress: 75,
    department: 'Development',
    faculty: 'Development',
    level: 'Advanced',
    estimatedHours: '12 hours',
    // rating: 4.8,
    // students: 2847,
    expectedSchedules: 24,
    completedSchedules: 18,
    // lastAccessed: '2 days ago',
    completed: false,
    tags: ['React', 'JavaScript', 'Frontend'],
    description:
      'Master advanced React concepts including hooks, context, performance optimization, and modern patterns.',
  },
  {
    id: 2,
    courseTitle: 'UI/UX Design Fundamentals',
    instructor: { name: 'Michael Chen' },
    thumbnail:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop',
    progress: 100,
    department: 'Design',
    faculty: 'Design',
    level: 'Beginner',
    estimatedHours: '8 hours',
    // rating: 4.9,
    // students: 5432,
    expectedSchedules: 16,
    completedSchedules: 16,
    // lastAccessed: '1 week ago',
    completed: true,
    tags: ['UI', 'UX', 'Figma'],
    description:
      'Learn the fundamentals of user interface and user experience design with hands-on projects.',
  },
  {
    id: 3,
    courseTitle: 'Python for Data Science',
    instructor: { name: 'Dr. Emily Rodriguez' },
    thumbnail:
      'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=200&fit=crop',
    progress: 45,
    department: 'Data Science',
    faculty: 'Data Science',
    level: 'Intermediate',
    estimatedHours: '15 hours',
    // rating: 4.7,
    // students: 3921,
    expectedSchedules: 32,
    completedSchedules: 14,
    // lastAccessed: '3 days ago',
    completed: false,
    tags: ['Python', 'Data Analysis', 'Pandas'],
    description:
      'Comprehensive guide to using Python for data analysis, visualization, and machine learning.',
  },
  {
    id: 4,
    courseTitle: 'Digital Marketing Strategy',
    instructor: { name: 'James Wilson' },
    thumbnail:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
    progress: 20,
    department: 'Marketing',
    faculty: 'Marketing',
    level: 'Beginner',
    estimatedHours: '10 hours',
    // rating: 4.6,
    // students: 1876,
    expectedSchedules: 20,
    completedSchedules: 4,
    // lastAccessed: '5 days ago',
    completed: false,
    tags: ['Marketing', 'SEO', 'Social Media'],
    description:
      'Build effective digital marketing campaigns and grow your online presence.',
  },
  {
    id: 5,
    courseTitle: 'Machine Learning Essentials',
    instructor: { name: 'Dr. Alex Kumar' },
    thumbnail:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop',
    progress: 90,
    department: 'Data Science',
    faculty: 'Data Science',
    level: 'Advanced',
    estimatedHours: '20 hours',
    // rating: 4.9,
    // students: 2156,
    expectedSchedules: 40,
    completedSchedules: 36,
    // lastAccessed: '1 day ago',
    completed: false,
    tags: ['ML', 'Python', 'TensorFlow'],
    description:
      'Deep dive into machine learning algorithms, implementation, and real-world applications.',
  },
  {
    id: 6,
    courseTitle: 'Mobile App Development',
    instructor: { name: 'Lisa Park' },
    thumbnail:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop',
    progress: 60,
    department: 'Development',
    faculty: 'Development',
    level: 'Intermediate',
    estimatedHours: '18 hours',
    // rating: 4.8,
    // students: 4321,
    expectedSchedules: 36,
    completedSchedules: 22,
    // lastAccessed: '4 days ago',
    completed: false,
    tags: ['React Native', 'Mobile', 'iOS', 'Android'],
    description:
      'Build cross-platform mobile applications using React Native and modern development practices.',
  },
];
