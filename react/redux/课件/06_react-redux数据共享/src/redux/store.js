import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducer from './reducer';
import personReducer from './reducers/person';
import thunk from 'redux-thunk';

const allReducer = combineReducers({
    number: reducer,
    personList: personReducer
})

export default createStore(allReducer, applyMiddleware(thunk));