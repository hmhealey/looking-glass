import {expect} from 'chai';

import {deepFreeze} from 'utils/deep_freeze';

describe('deepFreeze', () => {
    it('prevents mutation of array', () => {
        const value = deepFreeze([1]);

        expect(() => {
            value[0] = 4;
        }).to.throw();

        expect(() => {
            value.push('4');
        }).to.throw();
    });

    it('prevents mutation of object', () => {
        const value = deepFreeze({a: 1});

        expect(() => {
            value.b = 2;
        }).to.throw();
    });
});
