import React from 'react';

export default class CardPage extends React.Component {
    render() {
        const {params} = this.props.match;

        let contents;
        if (this.props.card.loading) {
            contents = <span>{'Loading...'}</span>;
        } else {
            contents = <div>{JSON.stringify(this.props.card, 2)}</div>;
        }

        return (
            <div>
                <h3>{'Set'}</h3>
                <p>{params.set}</p>
                <h3>{'Card Name'}</h3>
                <p>{params.cardName}</p>
                {contents}
            </div>
        );
    }
}
