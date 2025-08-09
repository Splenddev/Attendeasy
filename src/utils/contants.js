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

export const dummyScheduleInstances = [
  {
    _id: 'instance1',
    scheduleId: 'sched001',
    classDate: '2025-08-01T09:00:00.000Z',
    classStatus: 'held',
    updatedTime: {
      start: '10:00',
      end: '12:00',
    },
    updatedLocation: 'LT1, Science Complex',
    deliveryMode: 'physical',
    isAutoGenerated: false,
    lecturerMessage: 'Please revise last week’s material before class.',
    feedbackFromLecturer: 'Great student interaction today.',
    syllabusTopic: 'Introduction to Enzyme Kinetics',
    notes: 'Covered Michaelis-Menten equation and Lineweaver-Burk plot.',
    createdBy: 'rep123',
    createdByName: 'Felix Vincent',
    attendanceSummary: {
      totalPresent: 18,
      totalAbsent: 2,
      totalLate: 3,
    },
    studentPresence: [
      { studentId: 'stu1', status: 'present' },
      { studentId: 'stu2', status: 'late' },
      { studentId: 'stu3', status: 'absent' },
    ],
  },
  {
    _id: 'instance2',
    scheduleId: 'sched002',
    classDate: '2025-08-03T09:00:00.000Z',
    classStatus: 'cancelled',
    deliveryMode: 'physical',
    isAutoGenerated: true,
    lecturerMessage: 'Class cancelled due to unforeseen circumstances.',
    feedbackFromLecturer: '',
    syllabusTopic: '',
    notes: '',
    createdBy: 'admin001',
    createdByName: 'Admin Manager',
    attendanceSummary: {
      totalPresent: 0,
      totalAbsent: 0,
      totalLate: 0,
    },
    studentPresence: [],
  },
  {
    _id: 'instance3',
    scheduleId: 'sched003',
    classDate: '2025-08-05T14:00:00.000Z',
    classStatus: 'postponed',
    rescheduledToDate: '2025-08-08T14:00:00.000Z',
    deliveryMode: 'virtual',
    isAutoGenerated: false,
    lecturerMessage: 'Class postponed due to public holiday.',
    feedbackFromLecturer: '',
    syllabusTopic: 'Bioenergetics',
    notes: '',
    createdBy: 'rep456',
    createdByName: 'Muna James',
    attendanceSummary: {
      totalPresent: 0,
      totalAbsent: 0,
      totalLate: 0,
    },
    studentPresence: [],
  },
  {
    _id: 'instance4',
    scheduleId: 'sched004',
    classDate: '2025-08-06T08:00:00.000Z',
    classStatus: 'rescheduled',
    rescheduledToDate: '2025-08-06T15:00:00.000Z',
    updatedTime: {
      start: '15:00',
      end: '17:00',
    },
    updatedLocation: 'LT2, Engineering Hall',
    deliveryMode: 'hybrid',
    isAutoGenerated: false,
    lecturerMessage: 'Class time changed due to department meeting.',
    feedbackFromLecturer: 'Low participation online.',
    syllabusTopic: 'Thermodynamics in Biochemistry',
    notes: 'Focused on entropy and Gibbs free energy.',
    createdBy: 'rep789',
    createdByName: 'Samuel Obi',
    attendanceSummary: {
      totalPresent: 12,
      totalAbsent: 6,
      totalLate: 1,
    },
    studentPresence: [
      { studentId: 'stuA', status: 'present' },
      { studentId: 'stuB', status: 'present' },
      { studentId: 'stuC', status: 'late' },
    ],
  },
  {
    _id: 'instance5',
    scheduleId: 'sched005',
    classDate: '2025-08-07T08:00:00.000Z',
    classStatus: 'missed',
    deliveryMode: 'physical',
    isAutoGenerated: true,
    lecturerMessage: '',
    feedbackFromLecturer: '',
    syllabusTopic: '',
    notes: '',
    createdBy: 'rep999',
    createdByName: 'Rita Nwachukwu',
    attendanceSummary: {
      totalPresent: 0,
      totalAbsent: 0,
      totalLate: 0,
    },
    studentPresence: [],
  },
];
