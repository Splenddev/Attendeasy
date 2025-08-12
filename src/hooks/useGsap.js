// useGsap.js
import { useEffect } from 'react';
import gsap from 'gsap';

export default function useGsap(
  targets,
  fromVars,
  toVars,
  deps = [],
  options = {}
) {
  useEffect(() => {
    const { staggerEnter = 0.05, exitVars, staggerExit = 0.03 } = options;

    const elements = Array.isArray(targets)
      ? targets
          .map((ref) => (ref?.nodeType ? ref : ref?.current))
          .filter(Boolean)
      : targets?.current
      ? [targets.current]
      : [];

    if (elements.length === 0) return;

    gsap.killTweensOf(elements);

    if (exitVars) {
      gsap.to(elements, {
        ...exitVars,
        stagger: staggerExit,
        onComplete: () => {
          gsap.fromTo(
            elements,
            { ...fromVars },
            { ...toVars, stagger: staggerEnter }
          );
        },
      });
    } else {
      gsap.fromTo(
        elements,
        { ...fromVars },
        { ...toVars, stagger: staggerEnter }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
