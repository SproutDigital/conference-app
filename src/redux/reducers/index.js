import { combineReducers } from 'redux';
import authReducer from './authReducer';
import eventReducer from './eventReducer';
import profileReducer from './profileReducer';

export default rootReducer = combineReducers({
  authReducer, eventReducer, profileReducer,
});