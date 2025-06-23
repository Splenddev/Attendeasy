// Central config for allowed file extensions
export const allowedExtensions = {
  doc: ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx'],
  image: ['.png', '.jpeg', '.webp'],
  video: ['.mp4', '.webm', '.avi'],
  audio: ['.mp3', '.aac', '.wav', '.wma'],
};

// Schedule data
export const schedule = [
  {
    id: 'course-1',
    courseTitle: 'Analytical Biochemistry',
    lecturerName: 'Dr. Johnson',
    courseCode: 'BCH303',
    classroomVenue: 'Venue B',
    classDaysTimes: [
      {
        day: 'Friday',
        timing: {
          startTime: '10:52',
          endTime: '15:52',
        },
      },
      {
        day: 'Tuesday',
        timing: {
          startTime: '10:52',
          endTime: '15:52',
        },
      },
      {
        day: 'Thursday',
        timing: {
          startTime: '10:52',
          endTime: '15:52',
        },
      },
    ],
    media: [
      {
        id: 'media-1a',
        fileType: 'doc',
        allowedExt: allowedExtensions.doc,
        src: 'syllabus.pdf',
        name: 'Syllabus Overview',
        dateAdded: '2025-05-27',
        timeAdded: '11:47 AM',
      },
      {
        id: 'media-1b',
        fileType: 'image',
        allowedExt: allowedExtensions.image,
        src: 'diagram.png',
        name: 'Enzyme Diagram',
        dateAdded: '2025-05-27',
        timeAdded: '11:47 AM',
      },
      {
        id: 'media-1c',
        fileType: 'video',
        allowedExt: allowedExtensions.video,
        src: 'lecture.mp4',
        name: 'Biochem Lecture 1',
        dateAdded: '2025-05-27',
        timeAdded: '11:47 AM',
      },
      {
        id: 'media-1d',
        fileType: 'audio',
        allowedExt: allowedExtensions.audio,
        src: 'recap.mp3',
        name: 'Audio Recap',
        dateAdded: '2025-05-27',
        timeAdded: '11:47 AM',
      },
    ],
  },
  {
    id: 'course-2',
    courseTitle: 'Experimental Biochemistry',
    lecturerName: 'Dr. Johnson',
    courseCode: 'BCH317',
    classroomVenue: 'Venue B',
    classDaysTimes: [
      {
        day: 'Thursday',
        timing: {
          startTime: '10:52',
          endTime: '15:52',
        },
      },
      {
        day: 'Monday',
        timing: {
          startTime: '10:52',
          endTime: '15:52',
        },
      },
      {
        day: 'Tuesday',
        timing: {
          startTime: '10:52',
          endTime: '15:52',
        },
      },
      {
        day: 'Wednesday',
        timing: {
          startTime: '10:52',
          endTime: '15:52',
        },
      },
    ],
    media: [
      {
        id: 'media-2a',
        fileType: 'doc',
        allowedExt: allowedExtensions.doc,
        src: 'lab_manual.pdf',
        name: 'Lab Manual',
        dateAdded: '2025-05-27',
        timeAdded: '11:47 AM',
      },
    ],
  },
  {
    id: 'course-3',
    courseTitle: 'Sample Biochemistry',
    lecturerName: 'Dr. Johnson',
    courseCode: 'BCH302',
    classroomVenue: 'Venue B',
    classDaysTimes: [
      {
        day: 'Friday',
        timing: {
          startTime: '10:52',
          endTime: '15:52',
        },
      },
      {
        day: 'Wednesday',
        timing: {
          startTime: '10:52',
          endTime: '15:52',
        },
      },
      {
        day: 'Saturday',
        timing: {
          startTime: '10:52',
          endTime: '15:52',
        },
      },
    ],
    media: [
      {
        id: 'media-3a',
        fileType: 'video',
        allowedExt: allowedExtensions.video,
        src: 'experiment.mp4',
        name: 'Sample Prep Tutorial',
        dateAdded: '2025-05-27',
        timeAdded: '11:47 AM',
      },
      {
        id: 'media-3b',
        fileType: 'audio',
        allowedExt: allowedExtensions.audio,
        src: 'instructions.mp3',
        name: 'Experiment Instructions',
        dateAdded: '2025-05-27',
        timeAdded: '11:47 AM',
      },
    ],
  },
];
export const scheduleJson = [
  {
    groupId: '665a7c02f3e8f9a1c24a6b11',
    courseTitle: 'Molecular Biology Techniques',
    courseCode: 'BIO402',
    lecturerName: 'Prof. Akinwale Ojo',
    classroomVenue: 'Science Complex, Lab 3',
    level: '400',
    department: 'Biological Sciences',
    faculty: 'Science',
    classDaysTimes: [
      {
        day: 'Monday',
        timing: { startTime: '09:00', endTime: '11:00' },
      },
      {
        day: 'Wednesday',
        timing: { startTime: '10:00', endTime: '12:00' },
      },
      {
        day: 'Friday',
        timing: { startTime: '08:30', endTime: '10:30' },
      },
    ],
    media: [
      {
        id: 'media-1a',
        fileType: 'doc',
        allowedExt: ['.pdf', '.doc', '.ppt'],
        src: 'molecular_intro.pdf',
        name: 'Lecture Notes - Intro',
        dateAdded: '2025-06-23',
        timeAdded: '10:30 AM',
        approved: true,
      },
      {
        id: 'media-1b',
        fileType: 'video',
        allowedExt: ['.mp4', '.webm'],
        src: 'extraction_demo.mp4',
        name: 'DNA Extraction Demo',
        dateAdded: '2025-06-23',
        timeAdded: '10:31 AM',
        approved: true,
      },
    ],
    repeat: 'weekly',
    isActive: true,
    allowAttendanceMarking: true,
    notificationLeadTime: 45,
    createdBy: '665a7c02f3e8f9a1c24a6aaa',
  },
  {
    groupId: '665a7c02f3e8f9a1c24a6b11',
    courseTitle: 'Analytical Chemistry',
    courseCode: 'CHM301',
    lecturerName: 'Dr. Grace Okoro',
    classroomVenue: 'Chemistry Lecture Hall 1',
    level: '300',
    department: 'Chemistry',
    faculty: 'Science',
    classDaysTimes: [
      {
        day: 'Tuesday',
        timing: { startTime: '12:00', endTime: '14:00' },
      },
      {
        day: 'Thursday',
        timing: { startTime: '08:00', endTime: '10:00' },
      },
      {
        day: 'Friday',
        timing: { startTime: '13:00', endTime: '15:00' },
      },
    ],
    media: [
      {
        id: 'media-2a',
        fileType: 'image',
        allowedExt: ['.png', '.jpeg'],
        src: 'titration_curve.png',
        name: 'Titration Curve',
        dateAdded: '2025-06-23',
        timeAdded: '10:45 AM',
        approved: false,
      },
      {
        id: 'media-2b',
        fileType: 'audio',
        allowedExt: ['.mp3', '.wav'],
        src: 'lab_guide_audio.mp3',
        name: 'Lab Guide',
        dateAdded: '2025-06-23',
        timeAdded: '10:47 AM',
        approved: true,
      },
    ],
    repeat: 'weekly',
    isActive: true,
    allowAttendanceMarking: true,
    notificationLeadTime: 30,
    createdBy: '665a7c02f3e8f9a1c24a6aaa',
  },
  {
    groupId: '665a7c02f3e8f9a1c24a6b11',
    courseTitle: 'Environmental Microbiology',
    courseCode: 'MCB210',
    lecturerName: 'Dr. Fatima Yusuf',
    classroomVenue: 'Lecture Room B5',
    level: '200',
    department: 'Microbiology',
    faculty: 'Life Sciences',
    classDaysTimes: [
      {
        day: 'Monday',
        timing: { startTime: '13:00', endTime: '15:00' },
      },
      {
        day: 'Wednesday',
        timing: { startTime: '08:00', endTime: '10:00' },
      },
      {
        day: 'Saturday',
        timing: { startTime: '10:00', endTime: '12:00' },
      },
    ],
    media: [
      {
        id: 'media-3a',
        fileType: 'doc',
        allowedExt: ['.pdf', '.docx'],
        src: 'waste_management_notes.pdf',
        name: 'Waste Management Notes',
        dateAdded: '2025-06-23',
        timeAdded: '11:00 AM',
        approved: true,
      },
      {
        id: 'media-3b',
        fileType: 'video',
        allowedExt: ['.mp4'],
        src: 'microbial_impact.mp4',
        name: 'Microbial Impact Video',
        dateAdded: '2025-06-23',
        timeAdded: '11:05 AM',
        approved: false,
      },
    ],
    repeat: 'weekly',
    isActive: true,
    allowAttendanceMarking: true,
    notificationLeadTime: 25,
    createdBy: '665a7c02f3e8f9a1c24a6aaa',
  },
];
