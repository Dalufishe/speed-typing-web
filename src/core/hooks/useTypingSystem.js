import { useEffect, useState } from "react";
import TypingSystem from "../TypingSystem";

const useTypingSystem = (config = {}, handleKeyDownWithLegalKey) => {
  useEffect(() => {
    const t = new TypingSystem(config);

    handleKeyDownWithLegalKey(t); // default render, not start yet

    const fn = () => {
      t.start_race((t) => {
        handleKeyDownWithLegalKey(t);
      });
      document.removeEventListener("keydown", fn);
    };

    document.addEventListener("keydown", fn);
  }, []);
};

export { useTypingSystem };
