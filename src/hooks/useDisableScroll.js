// utils/hooks/useDisableScroll.js
import { useEffect } from 'react';

const useDisableScroll = (isActive = false) => {
  useEffect(() => {
    if (!isActive) return;

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const body = document.body;

    // Lock scroll
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';
    body.style.width = '100%';

    return () => {
      // Restore scroll
      body.style.position = '';
      body.style.top = '';
      body.style.overflow = '';
      body.style.width = '';
      window.scrollTo({ top: scrollY });
    };
  }, [isActive]);
};

export default useDisableScroll;
