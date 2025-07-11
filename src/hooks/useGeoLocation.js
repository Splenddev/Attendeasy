import { useEffect, useState } from 'react';

export const useGeoLocation = (options = {}) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
    ...options,
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    const success = (pos) => {
      const coords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      };
      setLocation(coords);
      setError('');
      setLoading(false);
    };

    const failure = (err) => {
      setError(`Location error: ${err.message}`);
      setLocation(null);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, failure, defaultOptions);
  }, []);

  return { location, error, loading };
};
