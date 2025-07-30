import { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import {
  App,
  Attendance,
  ClassRepDashboard,
  ClassSchedule,
  Home,
  NotFound,
  StudentAttendance,
  StudentDashboard,
  StudentSchedules,
  Unauthorized,
} from '../utils/lazyPages';
import ProtectedRoutes from '../components/ProtectedRoutes';
import { ROLES } from '../utils/roles';
import CreateAttendance from '../pages/ClassRep/CreateAttendance/CreateAttendance';
import { AuthLayout, ClassRepLayout, StudentLayout } from '../layouts';
import { CreateSchedule, Login, Notifications, Register } from '../pages';
import MarkAttendance from '../pages/Student/MarkAttendance/MarkAttendance';
import InitialRedirect from '../components/InitialRedirect/InitialRedirect';
import GroupManagementPage from '../pages/ClassManagement/GroupManagementPage';
import UserProfilePage from '../pages/UserProfilePage/UserProfilePage';

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
        path: 'redirect',
        element: (
          <Suspense fallback={<Loader />}>
            <InitialRedirect />
          </Suspense>
        ),
      },
      {
        path: 'class-rep/',
        element: (
          <ProtectedRoutes allowedRoles={[ROLES.CLASS_REP]}>
            <Suspense fallback={<Loader minDelay={5000} />}>
              <ClassRepLayout />
            </Suspense>
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <Navigate
                to="dashboard"
                replace
              />
            ),
          },
          {
            path: 'dashboard',
            element: (
              <Suspense fallback={<Loader />}>
                <ClassRepDashboard />
              </Suspense>
            ),
          },
          {
            path: 'schedules/create',
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
              <Suspense fallback={<Loader minDelay={5000} />}>
                <Attendance />
              </Suspense>
            ),
          },
          {
            path: 'attendance/create',
            element: (
              <Suspense fallback={<Loader minDelay={6000} />}>
                <CreateAttendance />
              </Suspense>
            ),
          },
          {
            path: 'notifications/:id',
            element: <Notifications />,
          },
          {
            path: 'group-management',
            element: (
              <Suspense fallback={<Loader />}>
                <GroupManagementPage />
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
            index: true,
            element: (
              <Navigate
                to="dashboard"
                replace
              />
            ),
          },
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
            path: 'attendance/mark/:id',
            element: (
              <Suspense fallback={<Loader />}>
                <MarkAttendance />
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
          {
            path: 'group-management',
            element: (
              <Suspense fallback={<Loader />}>
                <GroupManagementPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'auth/',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: (
              <Navigate
                to="login"
                replace
              />
            ),
          },
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<Loader />}>
            <UserProfilePage />
          </Suspense>
        ),
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
