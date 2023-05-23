const hint_or_not = (
  state = {
    hint: true,
  },
  action
) => {
  const newState = { ...state };
  if (action.type === "set_hint_or_not") {
    newState.hint = action.hint;
    return newState;
  } else {
    return state;
  }
};

export { hint_or_not };
