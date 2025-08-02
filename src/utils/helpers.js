export const routesNavigate = (path) => {
  window.location.href = path;
};

export function formatName(name = '') {
  const parts = name.trim().split(/\s+/);

  if (parts.length === 0) return '';

  const firstName = parts[0];
  const initials = parts.slice(1).map((n) => n[0].toUpperCase() + '.');

  return [firstName, ...initials].join(' ');
}

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
  getValues,
  mapToValue = null
) => {
  const current = { ...checkedChoices };

  if (choiceMode === 'multiple') {
    current[choice] = !current[choice];
  } else {
    // Ensure only one is selected
    Object.keys(current).forEach((key) => (current[key] = false));
    current[choice] = true;
  }

  setValue(`${title}_choices`, current); // For UI rendering

  // === CASE 1: Boolean or scalar choice (e.g. Yes/No) ===
  if (mapToValue) {
    const mapped = mapToValue[choice];
    setValue(title, mapped);
    return;
  }

  // === CASE 2: Complex choice (e.g. day with time) ===
  const timeValue = getValues('classStartTime') || '';

  const selectedArray = Object.keys(current)
    .filter((key) => current[key])
    .map((day) => ({ day, time: timeValue }));

  setValue(title, selectedArray);
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
export const parseTimeToday = (timeString = '') => {
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

export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

export const getStatusStyle = (status) => {
  if (status === 'on_time' || status === 'on-time' || status === 'present')
    return 'main-color';
  else if (['late', 'absent'].includes(status)) {
    return status;
  } else return 'others';
};

export const generateSmartTip = (data = [], user, loading) => {
  if (!data || !user?._id || loading) return [];

  const tips = [];
  const studentData = data.map((att) => ({
    ...att,
    myRecord: att.studentRecords.find((s) => s.studentId === user._id),
  }));

  const validRecords = studentData.filter((entry) => !!entry.myRecord);

  const totalSessions = validRecords.length;

  // ⛔ Not enough data? Bail early
  if (totalSessions < 3) {
    return [
      'Keep showing up! More tips will appear as you attend more classes.',
    ];
  }

  // Metrics
  const presentOrOnTimeCount = validRecords.filter(
    (entry) =>
      entry.myRecord.finalStatus === 'present' ||
      entry.myRecord.finalStatus === 'on_time'
  ).length;

  const onTimeCount = validRecords.filter(
    (entry) => entry.myRecord.finalStatus === 'on_time'
  ).length;

  const lateCount = validRecords.filter(
    (entry) => entry.myRecord.finalStatus === 'late'
  ).length;

  const absentCount = validRecords.filter(
    (entry) => entry.myRecord.finalStatus === 'absent'
  ).length;

  const lastThree = validRecords.slice(-3);
  const allOnTime = lastThree.every((entry) => {
    const status = entry?.myRecord?.finalStatus;
    return status === 'present' || status === 'on_time';
  });

  const missedDays = validRecords
    .filter((entry) => entry?.myRecord?.finalStatus === 'absent')
    .map((entry) => entry.classTime.day);

  // --- BASELINE ---
  if (allOnTime) {
    tips.push('Great job! You were on time for your last 3 sessions.');
  }

  if (presentOrOnTimeCount === totalSessions && totalSessions >= 5) {
    tips.push('You have a perfect attendance record so far. Keep it up!');
  }

  if (lateCount >= 3) {
    tips.push(`You've been late ${lateCount} times. Aim to arrive earlier.`);
  }

  if (totalSessions >= 5 && presentOrOnTimeCount / totalSessions < 0.5) {
    tips.push(
      `Less than half of your classes were attended on time. Let’s improve that!`
    );
  }

  if (absentCount >= 3) {
    tips.push('You’ve missed a few classes recently. Try not to fall behind.');
  }

  // --- SMART PATTERNS ---
  if (missedDays.length > 1) {
    const frequencyMap = missedDays.reduce((acc, day) => {
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});
    const [mostMissedDay, freq] = Object.entries(frequencyMap).sort(
      (a, b) => b[1] - a[1]
    )[0];

    if (freq >= 2 && freq / missedDays.length >= 0.5) {
      tips.push(
        `You often miss classes on ${mostMissedDay}s. Try to plan better for those days.`
      );
    }
  }

  // --- TRENDS ---
  const firstHalf = validRecords.slice(0, Math.floor(totalSessions / 2));
  const secondHalf = validRecords.slice(Math.floor(totalSessions / 2));

  const countGood = (arr) =>
    arr.filter(
      (e) =>
        e?.myRecord?.finalStatus === 'present' ||
        e?.myRecord?.finalStatus === 'on_time'
    ).length;

  const firstHalfPresent = countGood(firstHalf);
  const secondHalfPresent = countGood(secondHalf);

  if (firstHalf.length >= 3 && secondHalf.length >= 3) {
    if (secondHalfPresent < firstHalfPresent) {
      tips.push('Your attendance has declined recently. Try to refocus.');
    } else if (secondHalfPresent > firstHalfPresent) {
      tips.push('Nice! Your attendance is improving. Keep it up!');
    }
  }

  // --- Behavioral Edge Cases ---
  if (lateCount >= 3 && absentCount === 0) {
    tips.push(
      'You’re always present, but often late. Aim for better punctuality.'
    );
  }

  if (tips.length === 0) {
    tips.push('Keep attending — smart tips will show up as patterns emerge!');
  }

  return tips;
};

export function parseDuration(duration = '0H10M') {
  const hours = parseInt(duration.match(/(\d+)H/)?.[1] || '0', 10);
  const minutes = parseInt(duration.match(/(\d+)M/)?.[1] || '0', 10);
  return hours * 60 + minutes;
}

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
export const formatTimeLeft = (input, format = 'mm:ss') => {
  let totalSeconds = 0;
  if (typeof input === 'number') {
    totalSeconds = input;
  } else if (
    typeof input === 'object' &&
    (input.seconds !== undefined || input.minutes !== undefined)
  ) {
    const { minutes = 0, seconds = 0 } = input;
    totalSeconds = minutes * 60 + seconds;
  } else {
    throw new Error('Invalid input. Must be number or { minutes, seconds }');
  }

  if (totalSeconds < 0) totalSeconds = 0;

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  switch (format) {
    case 'hh:mm:ss':
      return `${String(h).padStart(2, '0')}:${String(m).padStart(
        2,
        '0'
      )}:${String(s).padStart(2, '0')}`;

    case 'mm:ss': {
      const totalMinutes = Math.floor(totalSeconds / 60);
      return `${String(totalMinutes).padStart(2, '0')}:${String(s).padStart(
        2,
        '0'
      )}`;
    }

    case 'human':
      return [
        h > 0 ? `${h}h` : '',
        m > 0 ? `${m}m` : '',
        s > 0 || (h === 0 && m === 0) ? `${s}s` : '',
      ]
        .filter(Boolean)
        .join(' ');

    case 'seconds':
      return `${totalSeconds} seconds`;

    case 'auto':
      if (totalSeconds >= 3600) return formatTimeLeft(totalSeconds, 'hh:mm:ss');
      if (totalSeconds >= 60) return formatTimeLeft(totalSeconds, 'mm:ss');
      return formatTimeLeft(totalSeconds, '00:ss');

    default:
      return formatTimeLeft(totalSeconds, 'mm:ss');
  }
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

export const formatKey = (key) => {
  return key
    .split('.')
    .map((k) => k.replace(/([A-Z])/g, ' $1'))
    .join(' > ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

export const getAttendanceTimes = ({ att, offsets, entry }) => {
  if (!att?.classTime || !att?.entry) return null;

  const { checkInCloseTime, others } = offsets;
  const { start, end } = entry;

  return {
    checkInOpens: parseTimeToday2(start), // when check-in opens
    checkInCloses: parseTimeToday2(parseTime2(start, checkInCloseTime)), // when check-in ends (late after this)
    checkOutOpens: parseTimeToday2(
      parseTime2(att.classTime.end, `-${offsets}M`)
    ), // when check-out opens
    checkOutCloses: parseTimeToday2(end), // when check-out ends
  };
};

export function parseUserAgent(userAgent) {
  let os = 'Unknown OS';
  let browser = 'Unknown Browser';

  if (/Windows NT 10.0/.test(userAgent)) os = 'Windows 10';
  else if (/Windows NT 6.1/.test(userAgent)) os = 'Windows 7';
  else if (/Mac OS X/.test(userAgent)) os = 'macOS';
  else if (/Android/.test(userAgent)) os = 'Android';
  else if (/iPhone/.test(userAgent)) os = 'iOS';

  if (/Chrome\/([\d.]+)/.test(userAgent)) {
    const version = userAgent.match(/Chrome\/([\d.]+)/)[1].split('.')[0];
    browser = `Chrome ${version}`;
  } else if (/Firefox\/([\d.]+)/.test(userAgent)) {
    const version = userAgent.match(/Firefox\/([\d.]+)/)[1].split('.')[0];
    browser = `Firefox ${version}`;
  } else if (
    /Safari\/([\d.]+)/.test(userAgent) &&
    /Version\/([\d.]+)/.test(userAgent)
  ) {
    const version = userAgent.match(/Version\/([\d.]+)/)[1].split('.')[0];
    browser = `Safari ${version}`;
  } else if (/Edg\/([\d.]+)/.test(userAgent)) {
    const version = userAgent.match(/Edg\/([\d.]+)/)[1].split('.')[0];
    browser = `Edge ${version}`;
  }

  return { os, browser };
}
