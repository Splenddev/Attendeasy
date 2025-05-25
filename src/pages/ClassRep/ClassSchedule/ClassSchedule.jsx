import React, { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

const ClassSchedule = () => {
  const { setNavTitle } = useAuth();
  useEffect(() => {
    setNavTitle('Class Schedules');
  }, []);
  return <div>rep class schedules</div>;
};

export default ClassSchedule;
