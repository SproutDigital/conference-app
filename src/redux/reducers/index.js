import { combineReducers } from 'redux';
import authReducer from './authReducer';
import eventReducer from './eventReducer';
import profileReducer from './profileReducer';
import loginReducer from './loginReducer';

export default rootReducer = combineReducers({
  authReducer, eventReducer, profileReducer, loginReducer,
});