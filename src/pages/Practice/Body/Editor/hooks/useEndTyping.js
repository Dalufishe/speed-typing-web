import { useEffect } from "react";

const useEndTyping = (cb = () => {}, condition = []) => {
  useEffect(() => {
    const handleKeyDownEsc = (evt) => {
      if (evt.key === "Escape") {
        cb();
        document.removeEventListener("keydown", handleKeyDownEsc);
      }
    };
    document.addEventListener("keydown", handleKeyDownEsc);
  }, []);
};

export { useEndTyping };
