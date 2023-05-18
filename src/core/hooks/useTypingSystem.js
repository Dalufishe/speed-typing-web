import { useEffect, useState } from "react";

const useTypingSystem = (t, handleKeyDownWithLegalKey) => {
  const [head_article, set_head_article] = useState(t.head_article);
  const [tail_article, set_tail_article] = useState(t.tail_article);
  useEffect(() => {
    t.start_race(
      // handleKeyDownWithLegalKey
      (t) => {
        set_head_article(t.head_article);
        set_tail_article(t.tail_article);

        handleKeyDownWithLegalKey(t);
      }
    );
  }, []);
  return [head_article, tail_article];
};

export { useTypingSystem };
