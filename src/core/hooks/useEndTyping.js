import { useEffect } from "react";

const useEndTyping = (setEnd) => {
  useEffect(() => {
    const handleKeyDownEsc = (evt) => {
      if (evt.key === "Escape") {
        setEnd(true);
        document.removeEventListener("keydown", handleKeyDownEsc);
      }
    };
    document.addEventListener("keydown", handleKeyDownEsc);
  }, []);
};

export { useEndTyping };
