export const login = (accessToken) => {
  return {
    type: 'LOGIN',
    payload: accessToken,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};
