import { useState, useEffect } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(baseUrl + url);
        if (result.ok) {
          const json = await result.json();
          setData(json);
        } else {
          throw result;
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
