import { useEffect, useState } from "react";

import axios, { Canceler } from "axios";

export type QueryResult<T> = readonly [
  result: T | null,
  error: string,
  loading: boolean
];

export default function useCachedQuery<T>(
  cache: Record<string, T>,
  query: string
): QueryResult<T> {
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cached = cache[query];

    if (cached) {
      setResult(cached);
      setError("");
      setLoading(false);
      return;
    }

    let canceler: Canceler;

    const token = new axios.CancelToken(c => (canceler = c));

    setLoading(true);

    axios
      .get<T>(query, { cancelToken: token })
      .then(response => {
        const result = response.data;
        cache[query] = result;
        setResult(result);
        setLoading(false);
      })
      .catch(error => {
        if (axios.isCancel(error)) return;
        setError(error);
        setLoading(false);
      });

    return () => canceler();
  }, [cache, query]);

  return [result, error, loading];
}
