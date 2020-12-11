import { setKeyWord } from '../../Components/store/actions';

const INITAL_SATE = {
  navState: '',
  keyWord: '',
  longitude: 0,
  latitude: 0,
  focus: 'startDate',
  checkIn: null,
  checkOut: null,
  capacity: {
    adult: 0,
    child: 0,
    infant: 0,
    animal: false,
  },
};

const searchFilterReducer = (state = INITAL_SATE, action) => {
  switch (action.type) {
    case 'SET_KEY_WORD':
      return { ...state, keyWord: action.keyWord };

    case 'SET_CHECK_IN':
      return { ...state, checkIn: action.checkIn };

    case 'SET_CHECK_OUT':
      return { ...state, checkOut: action.checkOut };

    case 'SET_CAPACITY':
      return { ...state, capacity: action.capacity };

    case 'SET_FOCUS':
      return { ...state, focus: action.focus };

    case 'SET_NAV_STATE':
      return { ...state, navState: action.navState };

    default:
      return state;
  }
};

export default searchFilterReducer;
