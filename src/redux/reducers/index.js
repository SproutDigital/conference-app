import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EventReducer from './EventReducer';
import ProfileReducer from './ProfileReducer';
import LoginReducer from './LoginReducer';
import SponsorReducer from './SponsorReducer'; 
import ProgramReducer from './ProgramReducer'; 
import ResourceReducer from './ResourceReducer'; 



export default rootReducer = combineReducers({
  AuthReducer, EventReducer, ProfileReducer, LoginReducer, SponsorReducer, ProgramReducer,
  ResourceReducer
});