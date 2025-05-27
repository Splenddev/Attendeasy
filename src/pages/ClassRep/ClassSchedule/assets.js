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
