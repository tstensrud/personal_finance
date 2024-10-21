import { useState } from 'react';
import AxiosInstance from '../utils/AxiosInstance.jsx';

const useUpdateData = (endpoint) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await AxiosInstance.patch(endpoint, data);
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, setData, response, loading, error, handleSubmit };
};

export default useUpdateData;