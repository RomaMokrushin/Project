import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function useDebounce(callbackFn: Function, delay: number = 300) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callbackFn(...args);
    }, delay);
  };
}
