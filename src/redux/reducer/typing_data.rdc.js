import TypingSystem from "../../core/TypingSystem";
import { article_generator } from "../../pages/Practice/utils/article_generator";

const article = article_generator(1000);

const typing_data = (
  state = {
    _id: Math.random(),
    data: new TypingSystem({
      article,
      spanning: 30,
    }) 
  },
  action
) => {
  const newState = {};
  switch (action.type) {
    case "set-typing-data":
      newState.data = action.payload || state.data;
      newState._id = Math.random();
      return newState;
    default:
      return state;
  }
};
export { typing_data };
