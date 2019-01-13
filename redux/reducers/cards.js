import {combineReducers} from 'redux';

import * as ActionTypes from 'constants/action_types';

export function byId(state = {}, action) {
    switch(action.type) {
        case ActionTypes.RECEIVED_CARD:
            return {
                ...state,
                [action.card.id]: action.card,
            };
        case ActionTypes.RECEIVED_CARDS:
            return action.cards.reduce((nextState, card) => ({
                ...nextState,
                [card.id]: card,
            }), state);

        default:
            return state;
    }
}

export default combineReducers({
    byId,
});
