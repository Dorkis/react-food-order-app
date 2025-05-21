import { useCallback } from "react";
import { useEffect, useState } from "react";

function useFetch(fetchFn, method = 'GET', body) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchData] = useState([]);

  function cleadDate() {
    setFetchData([]);
  }

  const sendRequest = useCallback(
    async function sendRequest(body) {
      setIsFetching(true);
      try {
        const data = await fetchFn(body);
        setFetchData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data" });
      }
      setIsFetching(false);
    },
    [body]
  );

  useEffect(() => {
    if(method == 'GET' || body) {
        sendRequest();
    }
  }, [fetchFn, body]);

  return {
    isFetching,
    error,
    fetchedData,
    sendRequest,
    cleadDate
  };
}

export default useFetch;
