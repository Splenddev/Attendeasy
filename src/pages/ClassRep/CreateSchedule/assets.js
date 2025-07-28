export const createScheduleFormDataAssets = [
  {
    id: 1,
    title: 'Course Info',
    selectOptions: [
      {
        title: 'Course Code',
        name: 'courseCode',
        type: 'input',
        required: true,
        input: {
          type: 'text',
          placeholder: 'e.g. BCH301',
        },
      },
      {
        title: 'Course Title',
        name: 'courseTitle',
        type: 'input',
        required: true,
        input: {
          type: 'text',
          placeholder: 'e.g. Analytical Chemistry',
        },
      },
      {
        title: 'Credit Unit',
        name: 'creditUnit',
        type: 'select',
        options: ['1', '2', '3', '4', '5'],
        required: true,
      },
    ],
  },
  {
    id: 2,
    title: 'Lecturer Info',
    selectOptions: [
      {
        title: 'Lecturer Name',
        name: 'lecturerName',
        type: 'input',
        required: true,
        input: {
          type: 'text',
          placeholder: 'e.g. Dr. Grace Okoro',
        },
      },
      {
        title: 'Lecturer Email',
        name: 'lecturerEmail',
        type: 'input',
        input: {
          type: 'email',
          placeholder: 'e.g. grace@edu.ng',
        },
      },
    ],
  },
  {
    id: 3,
    title: 'Class Details',
    selectOptions: [
      {
        title: 'Classroom / Venue',
        name: 'classroomVenue',
        type: 'input',
        required: true,
        input: {
          type: 'text',
          placeholder: 'e.g. Science Complex, Lab 3',
        },
      },
      {
        title: 'Department',
        name: 'department',
        type: 'input',
        required: true,
        input: {
          type: 'text',
          placeholder: 'e.g. Chemistry',
        },
      },
      {
        title: 'Faculty',
        name: 'faculty',
        type: 'input',
        required: true,
        input: {
          type: 'text',
          placeholder: 'e.g. Science',
        },
      },
      {
        title: 'Level',
        name: 'level',
        type: 'select',
        options: ['100L', '200L', '300L', '400L', '500L'],
        required: true,
      },
      {
        title: 'Class Type',
        name: 'classType',
        type: 'select',
        options: ['Physical', 'Virtual'],
        required: true,
      },
      {
        title: 'Meeting Link (if Virtual)',
        name: 'virtualLink',
        type: 'input',
        required: false,
        input: {
          type: 'text',
          placeholder: 'e.g. https://meet.com/session123',
        },
      },
      {
        title: 'Max Student Capacity',
        name: 'maxStudents',
        type: 'input',
        required: false,
        input: {
          type: 'number',
          placeholder: 'e.g. 30',
        },
      },
      {
        title: 'Class Location',
        name: 'classLocation',
        type: 'location',
        required: true,
      },
    ],
  },
  {
    id: 4,
    title: 'Class Days & Time',
    selectOptions: [
      {
        title: 'Class Days & Times',
        name: 'classDaysTimes',
        type: 'dayTimeChoice',
        required: true,
      },
    ],
  },
  {
    id: 5,
    title: 'Schedule Settings',
    selectOptions: [
      {
        title: 'Repeat Pattern',
        name: 'repeatPattern',
        type: 'select',
        options: ['weekly', 'bi-weekly', 'monthly'],
        required: true,
      },
      {
        title: 'Reminder Before Class',
        name: 'notificationLeadTime',
        type: 'select',
        options: [
          { text: 'None', value: '' },
          { text: '10 min before', value: 10 },
          { text: '30 min before', value: 30 },
          { text: '1 hr before', value: 60 },
        ],
        required: false,
      },
      {
        title: 'Allow Attendance Auto Creation',
        name: 'allowAttendanceMarking',
        type: 'select',
        options: ['Yes', 'No'],
        required: false,
      },
      {
        title: 'Auto-End Class After Duration',
        name: 'autoEnd',
        type: 'select',
        options: ['Yes', 'No'],
        required: false,
      },
      {
        title: 'Schedule Active',
        name: 'isActive',
        type: 'select',
        options: ['Yes', 'No'],
        required: false,
      },
    ],
  },
  {
    id: 6,
    title: 'Additional Information',
    selectOptions: [
      {
        title: 'Additional Notes',
        name: 'notes',
        type: 'textarea',
        input: {
          placeholder: 'E.g. bring lab coat for practicals...',
        },
        required: false,
      },
    ],
  },
  {
    id: 7,
    title: 'Media Section',
    selectOptions: [
      {
        title: 'Allow Student Media Uploads',
        name: 'allowMediaUploads',
        type: 'choice',
        choices: ['Yes', 'No'],
        required: false,
      },
    ],
  },
];

export const userCourses = [
  {
    courseCode: 'BCH301',
    courseTitle: 'Analytical Biochemistry',
    lecturerName: 'Dr. Grace Okoro',
    department: 'Biochemistry',
    level: '100L',
    faculty: 'Sciences',
    creditUnit: 2,
  },
  {
    courseCode: 'BCH202',
    courseTitle: 'Metabolism II',
    lecturerName: 'Prof. Adewale Benson',
    department: 'Biochemistry',
    level: '100L',
    faculty: 'Sciences',
    creditUnit: 1,
  },
  {
    courseCode: 'BCH201',
    courseTitle: 'Intro to Biochemistry',
    lecturerName: 'Prof. Irondi Wale',
    department: 'Biochemistry',
    level: '100L',
    faculty: 'Sciences',
    creditUnit: 1,
  },
  {
    courseCode: 'BCH202',
    courseTitle: 'Metabolism II',
    lecturerName: 'Prof. Adewale Benson',
    faculty: 'Sciences',
    level: '100L',
    creditUnit: 3,
  },
];
