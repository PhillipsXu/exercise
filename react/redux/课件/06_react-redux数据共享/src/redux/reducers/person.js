import { ADD_PERSON } from "../constant";

const initialState = [];

let person = (state = initialState, { type, data }) => {
    switch (type) {
        case ADD_PERSON:
            return [data, ...state];
        default:
            return state;
    }
}

export default person;