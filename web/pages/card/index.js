import {manage} from 'react-redux-manager';
import {createSelector} from 'reselect';

import {getCardByName} from 'shared/actions/cards';

import Card from './card.jsx';

function makeMapStateToProps(state, ownProps) {
    const cardPlaceholder = {
        loading: true,
        load: () => getCardByName(ownProps.match.params.cardName),
    };

    let lastCard;
    let firstTime = true;

    const getCardBySetAndName = (state, set, cardName) => {
        const id = state.cards.idsByName[cardName];
        let card = state.cards.byId[id];

        console.log(card, cardPlaceholder);

        return card || cardPlaceholder;
    };

    return function mapStateToProps(state, ownProps) {
        return {
            card: getCardBySetAndName(state, ownProps.match.params.set, ownProps.match.params.cardName),
        };
    };
}

export default manage(makeMapStateToProps)(Card);
