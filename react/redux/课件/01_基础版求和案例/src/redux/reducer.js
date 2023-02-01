const initialState = 0
export default (state = initialState, action) => {
    const {type, data} = action;
    switch (type) {
        case 'increment':
            return state + data;
        case 'decrement':
            return state - data;
        default:
            return state
    }
}
