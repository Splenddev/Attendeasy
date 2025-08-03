import { useCallback } from 'react';

const useScrollIntoView = (offset = 80) => {
  const scrollToRef = useCallback(
    (id, highlightClass = 'blink') => {
      if (!id) return;

      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.scrollY + rect.top - offset;

        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth',
        });

        element?.focus?.();

        if (highlightClass) {
          const classes = highlightClass.split(' ').filter(Boolean);

          element.classList.add(...classes);

          setTimeout(() => {
            element.classList.remove(...classes);
          }, 3200);
        }
      }
    },
    [offset]
  );

  return scrollToRef;
};

export default useScrollIntoView;
