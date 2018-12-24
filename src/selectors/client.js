import {createSelector} from 'reselect';

import {Client} from 'client';

export const getClient = createSelector(
    () => true,
    () => {
        return new Client();
    }
);
