const history_data = (
  state = {
    _id: Math.random(),
    data: [],
  },
  action
) => {
  const newState = { ...state };
  switch (action.type) {
    case "set-history-data":
      newState.data = [action.payload, ...state.data];
      newState._id = Math.random();
      return newState;
    default:
      return state;
  }
};
export { history_data };
