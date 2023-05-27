const is_local_login = (
  state = {
    is_local_login: false,
  },
  action
) => {
  const newState = { ...state };
  if (action.type === "set_is_local_login") {
    newState.is_local_login = action.is_local_login;
    return newState;
  }
  return state;
};

export { is_local_login };
