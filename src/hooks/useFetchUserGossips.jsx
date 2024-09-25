import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchUserGossips = () => {
  const [gossips, setGossips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGossips = async () => {
      try {
        const response = await axios.get('/api/gossips/user'); // Replace with your actual API endpoint
        setGossips(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGossips();
  }, []);

  return { gossips, loading, error };
};

export default useFetchUserGossips;
