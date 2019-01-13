import React from 'react';
import {ManagedProvider} from 'react-redux-manager';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

import {configureStore} from 'shared/store';

import CardPage from 'web/pages/card';

export default class Root extends React.PureComponent {
    constructor(props) {
        super(props);

        this.store = configureStore();
    }

    render() {
        return (
            <BrowserRouter>
                <ManagedProvider store={this.store}>
                    <h1>Root</h1>
                    <Switch>
                    <Route path={'/card/:set/:cardName'} component={CardPage}/>
                    <Route path='/' component={() => (
                        <div>{'This is the true root'}</div>
                    )}/>
                    </Switch>
                </ManagedProvider>
            </BrowserRouter>
        );
    }
}
