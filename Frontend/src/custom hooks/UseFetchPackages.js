import { useEffect, useState } from 'react';
import axiosInstance from '../components/axios/AxiosInstance';

const useFetchPackages = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(url);
        setData(res.data.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (url) fetchPackages();
  }, [url]);

  return { data, error, loading };
};

export default useFetchPackages;
