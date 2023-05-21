import { useEffect } from "react";

const useStartTyping = (setStart) => {
  useEffect(() => {
    document.addEventListener(
      "keydown",
      () => {
        setStart(true);
      },
      { once: true }
    );
  }, []);
};

export { useStartTyping };
