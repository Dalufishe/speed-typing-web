const set_history_data = (payload = null) => {
  return {
    type: "set-history-data",
    payload,
  };
};

export { set_history_data };
