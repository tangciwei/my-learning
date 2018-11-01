export default combineReducers = reducers => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce((currentState, key) => {
            currentState[key] = reducers[key](state[key], action);
            return currentState;
        }, {});
    };
}


