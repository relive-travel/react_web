import { useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      let focusInterval = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(focusInterval);
    }
  }, [delay]);
}

export default useInterval;
