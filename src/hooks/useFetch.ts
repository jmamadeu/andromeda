import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import api from '../services/api';

type FetchProps = {
  path: string;
  options?: {};
  query?: string;
  headers?: {
    Authorization: string;
  };
  method: 'POST' | 'GET';
  params?: any;
};

const useFetch = ({ path, query, method, params, headers }: FetchProps) => {
  const [response, setResponse] = useState<null | AxiosResponse>(null);
  const [error, setError] = useState<Error | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const response =
          method === 'POST'
            ? await api.post(path, { query }, { headers })
            : await api.get(path, {
                params,
              });

        setResponse(response);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    })();
  }, []);

  return { response, error, isLoading };
};

export default useFetch;
