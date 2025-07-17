// NavigationProgress.jsx
import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import NProgress from 'nprogress';

export default function NavigationProgress() {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    NProgress.start();
    NProgress.set(0.3);

    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 100, // ms between each trickle step
      minimum: 0.1, // initial start position
    });

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300); // fake delay, tweak as needed

    return () => clearTimeout(timeout);
  }, [location, navType]);

  return null;
}
