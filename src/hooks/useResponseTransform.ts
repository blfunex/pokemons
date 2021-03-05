import { useEffect, useState } from "react";
import { QueryResult } from "./useQuery";

export default function useResponseTransform<T, U>(
  state: QueryResult<T>,
  transform: (value: T) => U
) {
  const [result, setResult] = useState<U>(null!);

  const [, , response] = state;

  useEffect(() => {
    if (response) setResult(transform(response));
    else setResult(null!);
  }, [response, transform]);

  return result;
}
