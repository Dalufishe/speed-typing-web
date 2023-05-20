import { words } from "../../../../../data/words";

const article_generator = (wordCount) => {
  let article = "";

  for (let i = 0; i < wordCount; i++) {
    article += words[Math.floor(Math.random() * words.length)] + " ";
  }

  return article;
};

export { article_generator };
