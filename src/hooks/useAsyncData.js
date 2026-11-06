import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to simulate asynchronous data loading with skeleton previews.
 * Runs once on mount, transitions from skeleton to real content smoothly,
 * and allows manual reloading on demand.
 */
export const useAsyncData = (initialData, delay = 500) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initialDataRef = useRef(initialData);
  initialDataRef.current = initialData;

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      setData(initialDataRef.current);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(initialDataRef.current);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return {
    data: data !== null ? data : initialData,
    loading,
    error,
    reload,
    setLoading
  };
};

export default useAsyncData;
