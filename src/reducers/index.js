import { combineReducers } from 'redux';
import userReducer from './userReducer';
import weatherReducer from './weatherReducer';

const allReducers = combineReducers({
    userReducer,
    weatherReducer
})

export default allReducers;
