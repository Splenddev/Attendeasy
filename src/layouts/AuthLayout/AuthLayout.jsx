import CalendarSchedule from './CalendarSchedule';
const scheduleData = {
  '2024-11-01': [
    {
      time: '9:30 am',
      grade: 'All Grade',
      title: 'Homeroom & Announcement',
      color: 'green',
    },
    {
      time: '10:00 am',
      grade: 'Grade 8',
      title: 'Math Review & Practice',
      color: 'orange',
    },
    {
      time: '11:30 am',
      grade: 'Grade 7',
      title: 'English speaking Discussion',
      color: 'red',
    },
    {
      time: '12:00 am',
      grade: 'Grade 9',
      title: 'Practical Science Topics Show',
      color: 'green',
    },
  ],
};
const AuthLayout = () => {
  return (
    <div>
      <p>Login | Signup</p>
      <CalendarSchedule scheduleData={scheduleData} />
    </div>
  );
};

export default AuthLayout;
