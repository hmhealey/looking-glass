import React from 'react';
import {Provider} from 'react-redux';

import {configureStore} from 'store/index';

export default class Root extends React.PureComponent {
    constructor(props) {
        super(props);

        this.store = configureStore();
    }

    render() {
        return (
            <Provider store={this.store}>
                <h1>Root</h1>
            </Provider>
        );
    }
}
