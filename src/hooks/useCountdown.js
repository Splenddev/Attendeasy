import { useEffect, useState, useRef } from 'react';

export const useCountdown = (targetTime) => {
  const target = useRef(new Date(targetTime)); // ✅ fix target reference

  const calculateTimeLeft = () => {
    const now = new Date();
    const diff = target.current - now;
    return Math.max(0, diff);
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]); // ref won't change, but dependency is string or date

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return { minutes, seconds, timeLeft };
};
