import { useState } from 'react';
import styles from './StudentSchedules.module.css';
import { FiGrid, FiList, FiBook } from 'react-icons/fi';
import FiltersPanel from './components/FilterPanel';
import StatsPanel from './components/StatusPanel';
import Card from './components/Card';
import { useFetchSchedules } from '../../../hooks/useFetchSchedules';
import { useAuth } from '../../../context/AuthContext';
import { useEffect } from 'react';
import CalendarSchedule from '../../../layouts/AuthLayout/CalendarSchedule';
import Spinner from '../../../components/Loader/Spinner/Spinner';
import ViewChanger from '../../../components/ViewChanger/ViewChanger';
import { LuCalendarDays } from 'react-icons/lu';
import NoResults from '../../../components/NoResults/NoResults';

const StudentSchedules = () => {
  const { user, setNavTitle } = useAuth();
  const groupId = user?.group;

  const { schedules, loading, refetch } = useFetchSchedules(groupId);

  useEffect(() => {
    setNavTitle('Class Schedules');
  }, [setNavTitle]);

  const [viewMode, setViewMode] = useState('list');
  const [selectedDay, setSelectedDay] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCards, setExpandedCards] = useState({});

  const filteredSchedules = schedules.filter((schedule) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      schedule.courseTitle.toLowerCase().includes(search) ||
      schedule.courseCode.toLowerCase().includes(search) ||
      schedule.lecturerName.toLowerCase().includes(search);

    const matchesDay =
      selectedDay === 'All' ||
      schedule.classDaysTimes.some((day) => day.day === selectedDay);

    return matchesSearch && matchesDay;
  });

  const toggleCardExpansion = (id) =>
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));

  if (loading) {
    return (
      <div className="full-page-loader-wrap">
        <Spinner
          size="35px"
          scale="2.5"
          borderWidth="2px"
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>My Class Schedules</h1>
          <p>View and manage your class schedule and course materials</p>
        </header>

        {viewMode === 'list' && (
          <FiltersPanel
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        )}

        <StatsPanel schedules={schedules} />

        <ViewChanger
          views={[
            { value: 'calendar', icon: <LuCalendarDays /> },
            { value: 'list', icon: <FiList /> },
          ]}
          defaultView={viewMode}
          onChange={(value) => setViewMode(value)}
        />

        {filteredSchedules.length > 0 ? (
          viewMode === 'list' ? (
            <div
              className={
                viewMode === 'list' ? styles.gridLayout : styles.listLayout
              }>
              {filteredSchedules.map((schedule) => (
                <Card
                  key={schedule._id}
                  schedule={schedule}
                  isExpanded={!!expandedCards[schedule._id]}
                  onToggle={() => toggleCardExpansion(schedule._id)}
                />
              ))}
            </div>
          ) : (
            <CalendarSchedule
              courses={schedules}
              viewMode={viewMode}
            />
          )
        ) : (
          <NoResults
            title="No matching records"
            message="We couldn't find anything for your selected filters."
            icon={FiBook}
            buttonText="Reset Filters"
            onButtonClick={() => refetch()}
            primaryColor="var(--gray-400)"
          />
        )}
      </div>
    </div>
  );
};

export default StudentSchedules;
