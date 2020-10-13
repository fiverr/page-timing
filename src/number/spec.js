import { number } from './index.js';

const REALLY_BIG_NUMBER = new Array(20).fill(1000).reduce((a, b) => a * b);

describe('number', () => {
    [
        -1,
        '1',
        '1.1',
        undefined,
        null,
        '',
        'hello',
        '3g',
        {},
        [],
        Infinity,
        -Infinity,
        NaN
    ].forEach(
        (input) => it(
            `should convert ${input} to integer`,
            () => expect(number(input)).to.be.undefined
        )
    );

    [
        [1, 1],
        [1.111, 1.111],
        [0, 0],
        [REALLY_BIG_NUMBER, Number.MAX_SAFE_INTEGER]
    ].forEach(
        ([input, expected]) => it(
            `should convert ${input} to ${expected}`,
            () => expect(number(input)).to.equal(expected)
        )
    );
});
