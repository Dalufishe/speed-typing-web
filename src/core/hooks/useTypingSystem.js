import { useEffect, useState } from "react";
import TypingSystem from "../TypingSystem";

let t;

const useTypingSystem = (config = {}, handleKeyDownWithLegalKey) => {
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    t = new TypingSystem(config);
  }, []);

  useEffect(() => {
    handleKeyDownWithLegalKey(t); // default render, not start yet
    if (start) {
      t.start_race((t) => {
        handleKeyDownWithLegalKey(t);
      });
      setStart(false);
    }
    if (end) {
      t.end_race();
      setEnd(false);
    }
  }, [start, end]);

  return [setStart, setEnd];
};

export { useTypingSystem };
