import { useCallback, useState } from "react";
import axios from "axios";

export const useApi = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/${url}`
      );
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPostData = useCallback(async (url: string, body: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/${url}`,
        body
      );
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return { data, isLoading, error, fetchData, fetchPostData };
};
