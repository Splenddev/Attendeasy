import { parseTimeToday } from '../../../utils/helpers';

const now = new Date();

export const useDash = (startTime, endTime) => {
  const start = parseTimeToday(startTime);
  const end = parseTimeToday(endTime);
  let status = '';
  status =
    now < start
      ? 'not-started'
      : now > start && now < end
      ? 'in-progress'
      : 'ended';
  return { status };
};
