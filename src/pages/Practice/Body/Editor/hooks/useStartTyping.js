import { useCallback, useEffect } from "react";

const useStartTyping = (cb = () => {}, condition = []) => {
  const handleSpace = useCallback((evt) => {
    if (evt.key === " ") {
      cb();
      document.removeEventListener("keydown", handleSpace);
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleSpace);
  }, [...condition]);
};

export { useStartTyping };
