import { INCREMENT, DECREMENT } from './constant';

const initialState = parseInt(localStorage.getItem('number')) || 0;

let reducer = (state = initialState, { type, data }) => {
    switch (type) {
        case INCREMENT:
            localStorage.setItem('number', state + data);
            return state + data;
        case DECREMENT:
            localStorage.setItem('number', state - data);
            return state - data;
        default:
            return state
    }
}

export default reducer;
