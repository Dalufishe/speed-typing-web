const set_is_local_login = (is_local_login) => {
  return {
    type: "set_is_local_login",
    is_local_login,
  };
};

export {set_is_local_login}