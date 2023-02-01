import { combineReducers } from 'redux';
import number from './compute';
import personList from './/person';

export default combineReducers({
    number,
    personList
})