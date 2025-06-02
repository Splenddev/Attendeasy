export const routesNavigate = (path) => {
  window.location.href = path;
};
export const checkboxChange = (key, setState, state) => {
  setState((prev) => ({ ...prev, [key]: !prev[key] }));
  console.log(state);
};
export const onChoiceChange = (
  choice,
  checkedChoices,
  choiceMode,
  title,
  setValue,
  getValues
) => {
  const current = { ...checkedChoices };

  if (choiceMode === 'multiple') {
    current[choice] = !current[choice];
  } else {
    Object.keys(current).forEach((key) => (current[key] = false));
    current[choice] = true;
  }

  const timeValue = getValues('classStartTime') || '';

  const selectedArray = Object.keys(current)
    .filter((key) => current[key])
    .map((day) => ({ day, time: timeValue }));

  setValue(`${title}_choices`, current); // for UI
  setValue(`${title}`, selectedArray);
};

export const select = (type, setValue, selected, list, getValues) => {
  if (type === 'selectOne') {
    const prev = getValues('students') || [];
    const updated = prev.includes(selected)
      ? prev.filter((name) => name !== selected)
      : [...prev, selected];

    setValue('students', updated);
  }

  if (type === 'select-all') {
    const prev = getValues('students') || [];
    const allSelected = list.every((student) => prev.includes(student.name));
    const updated = allSelected ? [] : list.map((student) => student.name);

    setValue('students', updated);
  }
};
export const dateFormatter = (date) => {
  const validateDate = date ? new Date(date) : new Date();
  const formattedDate = validateDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  return formattedDate;
};
export const timeFormatter = (time, lang = 'en-US', seconds) => {
  // const passedTime=;
  const formattedTime = new Date(time).toLocaleTimeString(
    [lang],
    !seconds
      ? {
          hour: '2-digit',
          minute: '2-digit',
        }
      : { hour: '2-digit', minute: '2-digit', second: '2-digit' }
  );
  return formattedTime;
};
export const toCamelCase = (str) => {
  const formattedName = str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, '');
  return formattedName;
};
export const parseTimeToday = (timeString) => {
  const [hours, minutes, seconds] = timeString.split('T')[1].split(':');
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), Number(seconds ?? 0), 0);
  return date;
};
export const parseTimeToday2 = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));
  return date;
};
export const groupByDay = (schedule) => {
  return schedule.reduce((acc, course) => {
    course.classDaysTimes.forEach(({ day, timing }) => {
      if (!acc[day]) acc[day] = [];

      acc[day].push({
        courseTitle: course.courseTitle,
        courseCode: course.courseCode,
        lecturerName: course.lecturerName,
        classroomVenue: course.classroomVenue,
        timing,
        media: course.media,
      });
    });
    return acc;
  }, {});
};

export const updateTime = () => {
  return new Date().toLocaleTimeString();
};
export const parseTime2 = (refTime = '', value = '') => {
  let [hour, minutes] = refTime.split(':').map(Number);
  if (isNaN(hour) || isNaN(minutes)) return 'Invalid refTime';

  const match = value.match(/(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return 'Invalid value';

  const hoursToAdd = Number(match[1]) || 0;
  const minToAdd = Number(match[2]) || 0;

  minutes += minToAdd;
  hour += hoursToAdd + Math.floor(minutes / 60);
  minutes = minutes % 60;
  hour = hour % 24; // optional wrap-around

  return `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};
