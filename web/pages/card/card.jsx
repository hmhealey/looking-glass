import React from 'react';

export default class CardPage extends React.Component {
    render() {
        const {params} = this.props.match;

        return (
            <div>
                <h3>{'Set'}</h3>
                <p>{params.set}</p>
                <h3>{'Card Name'}</h3>
                <p>{params.cardName}</p>
            </div>
        );
    }
}
