import {INCREMENT, DECREMENT} from './constant';

const initialState = 0;

let reducer = (state = initialState, { type, data }) => {
    switch (type) {
        case INCREMENT:
            return state + data;
        case DECREMENT:
            return state - data;
        default:
            return state
    }
}

export default reducer;
