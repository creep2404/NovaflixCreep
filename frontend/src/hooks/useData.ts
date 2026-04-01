import { useState, useEffect } from 'react';

interface UseSimulatedDataOptions {
  delay?: number;
  simulateError?: boolean;
  simulateEmpty?: boolean;
}

export function useSimulatedData<T>(mockData: T, options: UseSimulatedDataOptions | number = 1000) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const delay = typeof options === 'number' ? options : options.delay || 1000;
  const simulateError = typeof options === 'object' ? options.simulateError : false;
  const simulateEmpty = typeof options === 'object' ? options.simulateEmpty : false;

  const fetchData = () => {
    setIsLoading(true);
    setError(null);
    setData(null);

    setTimeout(() => {
      if (simulateError) {
        setError(new Error('Failed to fetch data from the server.'));
      } else if (simulateEmpty) {
        setData((Array.isArray(mockData) ? [] : null) as any);
      } else {
        setData(mockData);
      }
      setIsLoading(false);
    }, delay);
  };

  useEffect(() => {
    fetchData();
  }, [mockData, delay, simulateError, simulateEmpty]);

  return { data, isLoading, error, refetch: fetchData };
}
