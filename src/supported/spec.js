const memoiseModule = require('../memoise');
memoiseModule.memoise = (key, fn) => fn();

describe('supported', () => {
    let supported;
    const performance = Object.getOwnPropertyDescriptor(window, 'performance');

    beforeEach(() => {
        delete require.cache[require.resolve('.')];
        supported = require('.').supported;
    });
    afterEach(() =>
        Object.defineProperty(window, 'performance', performance)
    );

    it('Should be supported', () =>
        expect(supported()).to.be.true
    );

    it('Should return false when no performance object exists', () => {
        delete window.performance;
        expect(supported()).to.be.false;
    });
});
