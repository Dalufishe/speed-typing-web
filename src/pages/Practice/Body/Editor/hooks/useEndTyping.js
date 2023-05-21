import { useEffect } from "react";

const useEndTyping = (setEnd, cb, condition=[]) => {
  useEffect(() => {
    const handleKeyDownEsc = (evt) => {
      if (evt.key === "Escape") {
        setEnd(true);
        cb();
        document.removeEventListener("keydown", handleKeyDownEsc);
      }
    };
    document.addEventListener("keydown", handleKeyDownEsc);
  }, [...condition]);
};

export { useEndTyping };
