// hooks/useMatricValidator.js

import { useState } from 'react';
import { validateMatricNumbersInGroup } from '../services/validator.service';

export const useMatricValidator = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const validate = async ({ groupId, matricNumbers }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await validateMatricNumbersInGroup({
        groupId,
        matricNumbers,
      });
      setResult(res.data.data);
      console.log(res.data);

      return res.data;
    } catch (err) {
      console.error('Matric validation failed:', err);
      setError(err.response?.data?.error || 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { validate, result, loading, error };
};
