import { useCallback, useEffect } from "react";

const useStartTyping = (cb = () => {}, condition = []) => {
  const handleSpace = useCallback((evt) => {
    if (evt.key === " ") {
      cb();
      document.removeEventListener("keyup", handleSpace);
    }
  });

  useEffect(() => {
    document.addEventListener("keyup", handleSpace);
  }, [...condition]);
};

export { useStartTyping };
