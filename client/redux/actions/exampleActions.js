import * as actionTypes from 'redux/types/exampleTypes';

export const increment = value => ({
    type: actionTypes.ADD,
    payload: {
        value,
    },
});

export const subtract = value => ({
    type: actionTypes.SUBTRACT,
    payload: {
        value,
    },
});
