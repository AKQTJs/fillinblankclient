import * as ActionTypes from './ActionTypes';

export const Tokens = (state = { isLoading: true,
    errMess: null,
    tokens:[]}, action) => {
    switch (action.type) {
        case ActionTypes.GET_TOKENS:
            return {...state, isLoading: false, errMess: null, tokens: action.payload};

        case ActionTypes.TOKENS_LOADING:
            return {...state, isLoading: true, errMess: null, tokens: []}

        case ActionTypes.TOKENS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};