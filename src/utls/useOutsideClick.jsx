import { useEffect, useRef } from "react";

export const useOutsideClick = (cb) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        cb();
      }
    };
    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [ref]);

  return ref;
};
