export const login = (token) => {
  return {
    type: 'LOGIN',
    payload: token,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export const setKeyWord = (keyWord) => {
  return {
    type: 'SET_KEY_WORD',
    keyWord: keyWord,
  };
};

export const setCheckIn = (checkIn) => {
  return {
    type: 'SET_CHECK_IN',
    checkIn: checkIn,
  };
};

export const setCheckOut = (checkOut) => {
  return {
    type: 'SET_CHECK_OUT',
    checkOut: checkOut,
  };
};

export const setCapacity = (capacity) => {
  return {
    type: 'SET_CAPACITY',
    capacity: capacity,
  };
};

export const setFocus = (focus) => {
  return {
    type: 'SET_FOCUS',
    focus: focus,
  };
};

export const setNavState = (navState) => {
  return {
    type: 'SET_NAV_STATE',
    navState: navState,
  };
};
