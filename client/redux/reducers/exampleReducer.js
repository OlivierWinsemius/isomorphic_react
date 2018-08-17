import * as actionTypes from 'redux/types/exampleTypes';

const initialState = {
    count: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD:
            return {
                ...state,
                count: state.count + action.payload.value,
            };
        case actionTypes.SUBTRACT:
            return {
                ...state,
                count: state.count - action.payload.value,
            };
        default:
            return state;
    }
}
