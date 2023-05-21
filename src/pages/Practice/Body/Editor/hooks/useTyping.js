import { useCallback, useEffect, useState } from "react";

const useTyping = () => {
  const [typing, setTyping] = useState(false);
  const handleKeyDown = useCallback(() => {
    setTyping(true);
  });
  const handleKeyUp = useCallback(() => {
    setTyping(false);
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return [typing];
};

export { useTyping };
