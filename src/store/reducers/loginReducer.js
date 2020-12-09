const INITIAL_STATE = {
  accessToken: null,
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN':
      return { accessToken: action.payload };
    case 'LOGOUT':
      return { accessToken: null };
    default:
      return state;
  }
}

export default loginReducer;
