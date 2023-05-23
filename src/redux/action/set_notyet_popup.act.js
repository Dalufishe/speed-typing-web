const set_notyet_popup = (popup = true) => {
  return {
    type: "set_notyet_popup",
    popup,
  };
};

export { set_notyet_popup };
