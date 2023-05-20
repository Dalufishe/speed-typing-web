import TypingSystem from "../../core/TypingSystem";

const typing_data = (
  state = {
    _id: Math.random(),
    data: new TypingSystem({}) /* template, not the real data */,
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
