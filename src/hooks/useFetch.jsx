import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";

// custom hook which fetches data for the custom url
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //   whenever there is a change in url
  useEffect(() => {
    setLoading(true);
    setData(null); 
    setError(null);
    fetchData(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
