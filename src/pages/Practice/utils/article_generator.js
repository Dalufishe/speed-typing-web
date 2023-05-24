import { words } from "../../../data/words";

const article_generator = (wordCount) => {
  let article = "";

  for (let i = 0; i < wordCount; i++) {
    article += words[Math.floor(Math.random() * words.length)] + " ";
  }
  
  article = article.slice(0, article.length - 1);
  return article;
};

export { article_generator };
