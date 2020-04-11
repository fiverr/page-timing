const memoiseModule = require('../memoise');

memoiseModule.memoise = (key, fn) => fn();

describe('start', () => {
    let start;
    const performance = Object.getOwnPropertyDescriptor(window, 'performance');

    beforeEach(() => {
        delete require.cache[require.resolve('.')];
        start = require('.').start;
    });
    afterEach(() =>
        Object.defineProperty(window, 'performance', performance)
    );

    it('Should retrieve timeOrigin when available', () => {
        window.performance = { timeOrigin: 2 };
        expect(start()).to.equal(2);
    });

    it('Should retrieve a number', () => {
        window.performance = { timeOrigin: 0, timing: { navigationStart: 5 } };
        expect(start()).to.equal(5);
    });
});
