import { useState, useCallback } from 'react';

export const useRequest = () => {
  const [loading, setLoading ] = useState(false);
  const [error, setError ] = useState(null);

  const request = useCallback(
    async (url, method="GET", body=null, headers = {}) => {
      setLoading(true);
      try {
        const response = await fetch(url, {method, body, headers});

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || {message: "Something went wrong."});
        }
        setLoading(false);
        return data;
      } catch (err) {
        setError(err);
        setLoading(false);
        throw err.message;
      }
    }, []);
    
  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
}