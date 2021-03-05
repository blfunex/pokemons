import { useEffect, useState } from "react";

import axios, { Canceler } from "axios";

export type QueryResult<T> = readonly [
  loading: boolean,
  error: string,
  result: T
];

export default function useQuery<T>(
  cache: Record<string, T>,
  query: string
): QueryResult<T> {
  const [result, setResult] = useState<T>(null!);
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
      .then(
        response => {
          const result = response.data;
          cache[query] = result;
          setResult(result);
          setLoading(false);
        },
        error => {
          if (axios.isCancel(error)) return;
          setError(error);
          setLoading(false);
        }
      );

    return () => canceler();
  }, [cache, query]);

  return [loading, error, result];
}
