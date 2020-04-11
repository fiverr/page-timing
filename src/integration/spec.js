import wait from '@lets/wait';
import { onload } from '../spec-helper';

const timeOrigin = 1;

const mock = {
    unloadEventStart: 0,
    unloadEventEnd: 0,
    secureConnectionStart: 0,
    redirectStart: 0,
    redirectEnd: 0,
    navigationStart: 1,
    connectStart: 110,
    connectEnd: 120,
    domainLookupEnd: 130,
    domainLookupStart: 140,
    fetchStart: 150,
    requestStart: 170,
    responseStart: 180,
    domLoading: 190,
    responseEnd: 200,
    domInteractive: 210,
    domContentLoadedEventStart: 220,
    domContentLoadedEventEnd: 230,
    loadEventStart: 240,
    domComplete: 250,
    loadEventEnd: 260
};

const results = Object.entries(mock).reduce(
    (results, [key, value]) =>
        value > timeOrigin
            ?
            Object.assign(results, { [key]: value - timeOrigin })
            :
            results,
    {}
);

describe('Integration', async() => {
    delete require.cache[require.resolve('../')];
    delete require.cache[require.resolve('../start')];
    delete require.cache[require.resolve('../measurement')];
    require('../supported').supported(); // cached result

    const performance = Object.getOwnPropertyDescriptor(window, 'performance');

    beforeEach(() => {
        window.performance = {
            timeOrigin,
            timing: mock
        };
    });
    afterEach(() => {
        Object.defineProperty(window, 'performance', performance);
    });

    it('Should extract all performance metrics to a structured object, and skip 0 values', async() => {
        await onload();
        await wait(400);

        const pageTiming = require('../').pageTiming;

        const obj = { key: 'value', metrics: {} };
        const reducer = (accumulator, [key, value]) => Object.assign(
            accumulator,
            { [key]: parseInt(value, 10) }
        );

        pageTiming({
            reducer,
            accumulator: obj.metrics
        });

        expect(obj).to.deep.equal({
            key: 'value',
            metrics: results
        });
    });
});
