import { useEffect } from "react";

const useStartTyping = (setStart, cb, condition = []) => {
  useEffect(() => {
    document.addEventListener(
      "keydown",
      () => {
        setStart(true);
        cb();
      },
      { once: true }
    );
  }, [...condition]);
};

export { useStartTyping };
