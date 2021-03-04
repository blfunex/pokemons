import { useEffect, useState } from "react";

import axios, { Canceler } from "axios";

export type QueryResult<T> = readonly [
  loading: boolean,
  error: string,
  result: T
];

export default function useQuery<T>(query: string): QueryResult<T> {
  const [result, setResult] = useState<T>(null!);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let canceler: Canceler;

    const token = new axios.CancelToken(c => (canceler = c));

    setLoading(true);

    axios.get(query, { cancelToken: token }).then(
      response => {
        setResult(response.data);
        setLoading(false);
      },
      error => {
        if (axios.isCancel(error)) return;
        setError(error);
        setLoading(false);
      }
    );

    return () => canceler();
  }, [query]);

  return [loading, error, result];
}
