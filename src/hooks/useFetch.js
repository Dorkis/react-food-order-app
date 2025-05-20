import { useEffect, useState } from "react";


function useFetch(fetchFn, initialValue) {
    const [isFetching, setIsFetching] = useState();
    const [error, setError] = useState();
    const [fetchedData, setFetchData] = useState(initialValue);

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setFetchData(data);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch data' });
            }
            setIsFetching(false);
        }

        fetchData();
    }, [fetchFn]);

    return {
        isFetching,
        error,
        fetchedData,
        setFetchData,
    }
}

export default useFetch;