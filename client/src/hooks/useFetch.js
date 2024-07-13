import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const res = await axios.get(url);
                const data = await res?.data;

                setApiData(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setServerError(error);
            }
        })();
    }, [url]);
    return { isLoading, apiData, serverError };
};

export default useFetch;
