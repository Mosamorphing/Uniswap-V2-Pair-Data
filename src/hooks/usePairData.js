import { useState, useEffect } from "react";
import { fetchPairData } from "../utils/fetchPairData";

export const usePairData = (pairAddress) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pairAddress) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchPairData(pairAddress);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pairAddress]);

  return { data, loading, error };
};
