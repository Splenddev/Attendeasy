import { courseCodeOptions } from '../../../utils/contants';

export const createScheduleFormDataAssets = [
  {
    id: 1,
    title: 'Course Assignment',
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
        title: 'Course Unit',
        type: 'select',
        options: [0, 1, 2, 3, 4, 5],
        required: true,
      },
    ],
  },
  {
    id: 2,
    title: 'Schedule Info',
    selectOptions: [
      {
        title: 'Schedule Title',
        type: 'input',
        input: {
          type: 'text',
          placeholder: 'e.g. Biochemistry Daily Class Schedule',
        },
        required: true,
      },
      {
        title: 'Semester',
        type: 'select',
        options: ['First', 'Second'],
        required: true,
      },
      {
        title: 'Class Days & Times',
        type: 'dayTimeChoice', // custom-rendered in FieldSet switch or via DynamicForm
        required: true,
      },
    ],
  },
  {
    id: 3,
    title: 'Lecturer Info',
    selectOptions: [
      {
        title: 'Lecturer Name',
        type: 'input',
        input: {
          type: 'text',
          placeholder: 'e.g. Dr. Jane Smith',
        },
        required: true,
      },
      {
        title: 'Lecturer Email',
        type: 'input',
        input: {
          type: 'email',
          placeholder: 'e.g. jane.smith@university.edu',
        },
        required: false,
      },
    ],
  },
  {
    id: 4,
    title: 'Location',
    selectOptions: [
      {
        title: 'Classroom / Venue',
        type: 'input',
        input: {
          type: 'text',
          placeholder: 'e.g. Science Building, Room 101',
        },
        required: true,
      },
    ],
  },
  {
    id: 5,
    title: 'Notes / Extras',
    selectOptions: [
      {
        title: 'Additional Notes',
        type: 'textarea',
        input: {
          placeholder: 'e.g. Bring lab coat every Friday',
        },
        required: false,
      },
      {
        title: 'Reminder Setting',
        type: 'select',
        options: [
          { text: 'None', value: '' },
          { text: '10 min before', value: '0H10M' },
          { text: '1 hr before', value: '1H0M' },
          { text: '1 day before', value: '1D' },
        ],
        required: false,
      },
      {
        title: 'Schedule Color Tag',
        type: 'select',
        options: ['Red', 'Blue', 'Green', 'Yellow', 'Purple'],
        required: false,
      },
    ],
  },
];

export const others = {
  id: 6,
  title: 'Attendance Settings',
  selectOptions: [
    {
      title: 'Attendance Type',
      type: 'select',
      options: ['Strict ( P / A only )', 'Detailed ( P / A / L )'],
      required: true,
    },
    {
      title: 'Attendance Mode',
      type: 'select',
      options: ['No Code', 'Code'],
      required: true,
    },
    {
      title: 'Entry Start Time',
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
      title: 'Entry End Time',
      type: 'select',
      options: [
        { text: '10 min after entry start', value: '0H10M' },
        { text: '30 min after entry start', value: '0H30M' },
        { text: '1 hr after entry start', value: '1H0M' },
        { text: '1 hr 30 min after entry start', value: '1H30M' },
        { text: 'Manual' },
      ],
      required: true,
    },
    {
      title: 'Excusable Options',
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
      required: false,
    },
  ],
};
