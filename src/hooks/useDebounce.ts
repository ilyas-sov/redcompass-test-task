import { useCallback, useRef } from "react";

export function useDebounce(callback: (val: string) => void) {
  const timerRef = useRef<number | null>(null);

  const debouncedCallback = useCallback(
    (val: string) => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        callback(val);
      }, 500);
    },
    [callback]
  );

  return debouncedCallback;
}
