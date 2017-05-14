/**eslint-disable import/default */
import {combineReducers} from 'redux';
/*import courses from '../reducers/courseReducer';
import authors from '../reducers/authorReducer';*/
import ajaxCallsInProgress from '../reducers/ajaxStatusReducer'; 

//const rootReducers = combineReducers({courses,authors, ajaxCallsInProgress}); // courses: courses short hand property name 
const rootReducers = combineReducers({ajaxCallsInProgress}); // courses: courses short hand property name 
export default rootReducers;