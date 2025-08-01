import { lazy } from 'react';

export const App = lazy(() => import('../App'));
export const Home = lazy(() => import('../pages/Home/Home'));
export const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
export const Unauthorized = lazy(() =>
  import('../pages/Unauthorized/Unauthorized')
);
export const Attendance = lazy(() =>
  import('../pages/ClassRep/Attendance/Attendance')
);
export const ClassRepDashboard = lazy(() =>
  import('../pages/ClassRep/ClassRepDashboard/ClassRepDashboard')
);
export const ClassSchedule = lazy(() =>
  import('../pages/ClassRep/ClassSchedule/ClassSchedule')
);
export const CreateSchedule = lazy(() =>
  import('../pages/ClassRep/CreateSchedule/CreateSchedule')
);
export const StudentDashboard = lazy(() =>
  import('../pages/Student/StudentDashboard/StudentDashboard')
);
export const StudentAttendance = lazy(() =>
  import('../pages/Student/StudentAttendance/StudentAttendance')
);
export const StudentSchedules = lazy(() =>
  import('../pages/Student/StudentSchedules/StudentSchedules')
);
export const GroupResources = lazy(() =>
  import('../pages/GroupResources/GroupResources')
);

//layouts
