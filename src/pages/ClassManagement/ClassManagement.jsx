import React from 'react';
import './ClassManagement.css';
import { useAuth } from '../../context/AuthContext';
const ClassManagement = () => {
  const { user } = useAuth();
  const userRole = ; // or 'student' from auth
  const hasGroup = user.hasGroup; // simulate new user without group
  return <div></div>;
};

export default ClassManagement;
function App() {
  return (
    <Router>
      <div className="layout">
        {hasGroup && <Sidebar role={userRole} />}
        <main className="main-content">
          <Topbar />
          <Routes>
            {/* Onboarding check */}
            {userRole === 'classRep' && !hasGroup && (
              <Route
                path="*"
                element={<GroupSetup />}
              />
            )}
            {userRole === 'student' && !hasGroup && (
              <Route
                path="*"
                element={<SearchGroup />}
              />
            )}

            {/* Main Pages */}
            <Route
              path="/dashboard"
              element={<Dashboard role={userRole} />}
            />
            <Route
              path="/assignments"
              element={<Assignments role={userRole} />}
            />
            <Route
              path="/students"
              element={<Students />}
            />
            <Route
              path="/pleas"
              element={<Pleas />}
            />
            <Route
              path="/media"
              element={<Media />}
            />
            <Route
              path="/messages"
              element={<Messages />}
            />

            {/* Fallback */}
            <Route
              path="*"
              element={<Navigate to="/dashboard" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
