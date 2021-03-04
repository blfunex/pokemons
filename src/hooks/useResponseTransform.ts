import { useEffect, useState } from "react";
import { QueryResult } from "./useQuery";

export default function useResponseTransform<T, U>(
  state: QueryResult<T>,
  transform: (value: T) => U
) {
  const [result, setResult] = useState<U>(null!);

  const [loading, error, response] = state;

  useEffect(() => {
    if (!(loading || error)) setResult(transform(response));
    else setResult(null!);
  }, [loading, error, response, transform]);

  return result;
}
