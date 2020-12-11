import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import searchFilterReducer from './searchFilterReducer';

export default combineReducers({ loginReducer, searchFilterReducer });

// export default combineReducers({ searchFilterReducer });
