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
  date.setHours(Number(hours), Number(minutes), 0, 0);
  return date;
};
export const groupByDay = (schedule) => {
  return schedule.reduce((acc, course) => {
    course.classDaysTimes.forEach(({ day, timing }) => {
      if (!acc[day]) acc[day] = [];

      acc[day].push({
        id: course.id,
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
export const truncateText = (text = '', length = 20) => {
  if (typeof text !== 'string') return '';
  return text.length > length ? text.slice(0, length).trim() + '...' : text;
};
export const generateSmartTip = (history) => {
  const lastThree = history.slice(-3);
  const allOnTime = lastThree.every((h) => h.status === 'on time');
  if (allOnTime) return "🔥 You're on time 3 times in a row!";

  const missedDays = history
    .filter((h) => h.status === 'absent')
    .map((h) => h.day);
  const mostMissed =
    missedDays.length > 0
      ? missedDays.sort(
          (a, b) =>
            missedDays.filter((v) => v === a).length -
            missedDays.filter((v) => v === b).length
        )[0]
      : null;

  if (mostMissed)
    return `⚠️ You often miss classes on ${mostMissed}s. Be cautious.`;
  return null;
};

export const getTodaySchedule = (schedule) => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const todayDay = daysOfWeek[new Date().getDay()]; // e.g. "Friday"

  return schedule
    .map((course) => {
      // Find today's classDayTime if any
      const todayClassDayTime = course.classDaysTimes.find(
        (dayTime) => dayTime.day === todayDay
      );
      if (!todayClassDayTime) return null;

      // Return only today's info with timing
      return {
        id: course.id,
        courseTitle: course.courseTitle,
        lecturerName: course.lecturerName,
        courseCode: course.courseCode,
        classroomVenue: course.classroomVenue,
        day: todayDay,
        timing: todayClassDayTime.timing,
      };
    })
    .filter(Boolean); // remove nulls
};

// utils/helpers.js
export const timeDiffLabel = (mode, timeHHmm) => {
  const [h, m] = timeHHmm.split(':').map(Number);
  const target = new Date();
  target.setHours(h, m, 0, 0);
  const diff =
    mode === 'untilStart' ? target - Date.now() : target - Date.now(); // you can adjust logic if needed

  const mins = Math.max(0, Math.round(diff / 60000));
  return `${mins}min`;
};
export const formatTimeLeft = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
};

export const formatTimeDiff = (target) => {
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) return null;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  let result = '';
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0 || hours > 0) result += `${minutes}m `;
  result += `${seconds}s`;

  return result.trim();
};

export function catenateCredentialsSecure(
  values = [],
  {
    maxLength = 20,
    separator = '-',
    casing = 'upper',
    mask = false,
    obfuscate = false,
  } = {}
) {
  if (!Array.isArray(values)) return '';

  let result = values.filter(Boolean).join(separator);

  // Apply casing
  if (casing === 'lower') result = result.toLowerCase();
  else if (casing === 'upper') result = result.toUpperCase();

  if (mask) {
    return '*'.repeat(Math.min(result.length, maxLength));
  }

  if (obfuscate && result.length > maxLength) {
    const visible = result.slice(0, maxLength - 3);
    return visible + '***';
  }

  return result.length > maxLength ? result.slice(0, maxLength) : result;
}
