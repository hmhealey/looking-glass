import React from 'react';
import {connect} from 'react-redux';

import ManagerContext from './context';

export default function manage(mapStateToProps, mapDispatchToProps, mergeProps, extraOptions) {
    const managedConnect = connect(mapStateToProps, mapDispatchToProps, mergeProps, {
        getDisplayName: (name) => `Manage(${name})`, // TODO fix this to use the name of the child component
        ...extraOptions
    });

    return (Component) => {
        class ManagedComponent extends React.Component {
            componentDidMount() {
                // TODO is there a better way to iterate this?
                for (const key of Object.keys(this.props)) {
                    if (this.props[key] && this.props[key].loading) { // TODO come up with a better marker
                        this.props.request(this.props[key].load()); // TODO and loading method
                    }
                }
            }

            componentDidUpdate(prevProps) {
                for (const key of Object.keys(this.props)) {
                    if (this.props[key] && this.props[key] !== prevProps[key] && this.props[key].loading) {
                        this.props.request(this.props[key].load());
                    }
                }
            }

            render() {
                return <Component {...this.props}/>;
            }
        };

        return managedConnect((props) => (
            <ManagerContext.Consumer>
                {(request) => {
                    return (
                        <ManagedComponent
                            {...props}
                            request={request}
                        />
                    );
                }}
            </ManagerContext.Consumer>
        ));
    };
}
