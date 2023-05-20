const set_typing_data = (payload = null) => {
  return {
    type: "set-typing-data",
    payload,
  };
};

export { set_typing_data };
