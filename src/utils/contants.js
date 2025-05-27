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
