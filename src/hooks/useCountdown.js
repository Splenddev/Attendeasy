import { useEffect, useState } from 'react';

export const useCountdown = (targetTime) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date();
    return Math.max(0, targetTime - now);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, targetTime - now);
      setTimeLeft(diff);
      if (diff <= 0) clearInterval(interval);
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, [targetTime]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return { minutes, seconds, timeLeft };
};
