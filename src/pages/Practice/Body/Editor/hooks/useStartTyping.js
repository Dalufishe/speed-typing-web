import { useEffect } from "react";

const useStartTyping = (cb=()=>{}, condition = []) => {
  useEffect(() => {
    document.addEventListener(
      "keydown",
      () => {
        cb();
      },
      { once: true }
    );
  }, [...condition]);
};

export { useStartTyping };
