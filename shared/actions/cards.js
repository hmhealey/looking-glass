import * as ActionTypes from 'shared/constants/action_types';
import {getClient} from 'shared/selectors/client';

export function receivedCard(card) {
	return {
        type: ActionTypes.RECEIVED_CARD,
        card,
    };
}

export function receivedCards(cards) {
    return {
        type: ActionTypes.RECEIVED_CARDS,
        cards,
    };
}

export function getCardByName(name) {
    return async (dispatch, getState) => {
        const client = getClient(getState());
        const response = await client.getCardByName(name);

        if (response.data) {
            dispatch(receivedCard(response.data));
        }

        return response;
    };
}

export function getCardById(id) {
    return async (dispatch, getState) => {
        const client = getClient(getState());
        const response = await client.getCardById(id);

        if (response.data) {
            dispatch(receivedCard(response.data));
        }

        return response;
    };
}

export function getCardsByName(names) {
    return async (dispatch, getState) => {
        const cards = [];

        const numBatches = Math.ceil(names.length / 75);
        for (let i = 0; i < numBatches; i++) {
            const batchNames = numBatches > 1 ? names.slice(i * 75, (i + 1) * 75) : names;
            const identifiers = batchNames.map((name) => ({name}));

            const client = getClient(getState());
            const response = await client.getCards(identifiers);

            if (response.data) {
                cards.push(...response.data.data)
            } else if (response.error) {
                return response;
            }
        }

        dispatch(receivedCards(cards));

        return {data: cards};
    };
}
