import {expect} from 'chai';

import * as ActionCreators from 'action_creators/cards';

import * as Reducers from 'reducers/cards';

import {deepFreeze} from 'utils/deep_freeze';

describe('byId', () => {
    describe('receivedCard', () => {
        it('received the first card', () => {
            const state = deepFreeze({});
            const action = ActionCreators.receivedCard({id: 'card0'});

            const nextState = Reducers.byId(state, action);

            expect(nextState).to.deep.equal({
                card0: {id: 'card0'},
            });
        });

        it('received another card', () => {
            const state = deepFreeze({
                card0: {id: 'card0'},
            });
            const action = ActionCreators.receivedCard({id: 'card1'});

            const nextState = Reducers.byId(state, action);

            expect(nextState).to.deep.equal({
                card0: {id: 'card0'},
                card1: {id: 'card1'},
            });
        });

        it('received a card that we already have', () => {
            const state = deepFreeze({
                card0: {id: 'card0', name: 'Card0'},
            });
            const action = ActionCreators.receivedCard({id: 'card0', name: 'Card0 New'});

            const nextState = Reducers.byId(state, action);

            expect(nextState).to.deep.equal({
                card0: {id: 'card0', name: 'Card0 New'},
            });
        });
    });

    describe('receivedCards', () => {
        it('received cards', () => {
            const state = deepFreeze({});
            const action = ActionCreators.receivedCards([
                {id: 'card0'},
                {id: 'card1'},
            ]);

            const nextState = Reducers.byId(state, action);

            expect(nextState).to.deep.equal({
                card0: {id: 'card0'},
                card1: {id: 'card1'},
            });
        });

        it('received cards that we already have', () => {
            const state = deepFreeze({
                card0: {id: 'card0'},
                card1: {id: 'card1', name: 'Card1'},
            });
            const action = ActionCreators.receivedCards([
                {id: 'card1', name: 'Card1 New'},
                {id: 'card2'},
            ]);

            const nextState = Reducers.byId(state, action);

            expect(nextState).to.deep.equal({
                card0: {id: 'card0'},
                card1: {id: 'card1', name: 'Card1 New'},
                card2: {id: 'card2'},
            });
        });
    });
});
