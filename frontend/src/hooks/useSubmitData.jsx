import { useState } from 'react';
import AxiosInstance from '../utils/AxiosInstance.jsx';

const useSubmitData = (endpoint) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({});
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        try {
          const res = await AxiosInstance.post(endpoint, data);
          setResponse(res.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      return {data, setData, response, loading, error, handleSubmit};
};

export default useSubmitData;