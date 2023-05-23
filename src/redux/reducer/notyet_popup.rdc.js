const notyet_popup = (
  state = {
    popup: false,
  },
  action
) => {
  const newState = { ...state };
  if (action.type === "set_notyet_popup") {
    newState.popup = action.popup;
    return newState;
  } else {
    return state;
  }
};

export { notyet_popup };
