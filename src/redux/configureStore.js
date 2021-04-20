import {createStore, combineReducers} from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';

import {applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';
import { Users } from './users';
import { Tokens } from './tokens';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            users: Users,
            tokens: Tokens,
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}