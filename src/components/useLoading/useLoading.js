import { useState, useEffect } from 'react';

const useLoading = (location) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, [location]); // Trigger effect on location change

  return isLoading;
};

export default useLoading;