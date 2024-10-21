import { useState } from 'react';
import AxiosInstance from '../utils/AxiosInstance.jsx';

const useDeleteData = (endpoint) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({});
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        //e.preventDefault();
        setLoading(true);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
            data: data
          };
          const res = await AxiosInstance.delete(endpoint, config);
          setResponse(res.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      return {data, setData, response, loading, error, handleSubmit};
};

export default useDeleteData;