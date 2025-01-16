import { useState, useEffect } from 'react';
import axiosInstance from '../../lib/axios';

const useFetchPackages = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      console.log(url);
      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [url]);

  return { data, loading, error, refresh: fetchPackages };
};

export default useFetchPackages;
