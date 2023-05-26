// is start or not
// design to handle page-reload type DNF

const is_start_PERSIST = (
  state = {
    is_start_PERSIST: false,
  },
  action
) => {
  const newState = { ...state };
  if (action.type === "set_is_start_PERSIST") {
    newState.is_start_PERSIST = action.is_start_PERSIST;
    return newState;
  } else {
    return state;
  }
};

export { is_start_PERSIST };
