import {Provider} from 'react-redux';
import React from 'react';

import ManagerContext from './context';

export default class ManagedProvider extends React.Component {
    request = (action) => {
        console.log('requesting', action);
        this.props.store.dispatch(action);
    }

    render() {
        return (
            <ManagerContext.Provider value={this.request}>
                <Provider {...this.props}/>
            </ManagerContext.Provider>
        )
    }
}
