import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import {
  App,
  Attendance,
  ClassRepDashboard,
  ClassSchedule,
  CreateSchedule,
  Home,
  NotFound,
  StudentAttendance,
  StudentDashboard,
  StudentSchedules,
  Unauthorized,
} from '../utils/lazyPages';
import ProtectedRoutes from '../components/ProtectedRoutes';
import { ROLES } from '../utils/roles';
import ClassRepLayout from '../layouts/ClassRepLayout/ClassRepLayout';
import StudentLayout from '../layouts/StudentLayout/StudentLayout';
import CreateAttendance from '../pages/ClassRep/CreateAttendance/CreateAttendance';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'class-rep',
        element: (
          <ProtectedRoutes allowedRoles={[ROLES.CLASS_REP]}>
            <Suspense fallback={<Loader />}>
              <ClassRepLayout />
            </Suspense>
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            path: 'dashboard',
            element: (
              <Suspense fallback={<Loader />}>
                <ClassRepDashboard />
              </Suspense>
            ),
          },
          {
            path: 'schedule/create',
            element: (
              <Suspense fallback={<Loader />}>
                <CreateSchedule />
              </Suspense>
            ),
          },
          {
            path: 'schedules',
            element: (
              <Suspense fallback={<Loader />}>
                <ClassSchedule />
              </Suspense>
            ),
          },
          {
            path: 'attendance',
            element: (
              <Suspense fallback={<Loader />}>
                <Attendance />
              </Suspense>
            ),
          },
          {
            path: 'attendance/create',
            element: (
              <Suspense fallback={<Loader />}>
                <CreateAttendance />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'student',
        element: (
          <ProtectedRoutes allowedRoles={[ROLES.STUDENT]}>
            <Suspense fallback={<Loader />}>
              <StudentLayout />
            </Suspense>
          </ProtectedRoutes>
        ),
        children: [
          {
            path: 'dashboard',
            element: (
              <Suspense fallback={<Loader />}>
                <StudentDashboard />
              </Suspense>
            ),
          },
          {
            path: 'attendance',
            element: (
              <Suspense fallback={<Loader />}>
                <StudentAttendance />
              </Suspense>
            ),
          },
          {
            path: 'schedules',
            element: (
              <Suspense fallback={<Loader />}>
                <StudentSchedules />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'unauthorized',
        element: (
          <Suspense fallback={<Loader />}>
            <Unauthorized />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);
