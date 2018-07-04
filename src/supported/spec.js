const memoiseModule = require('../memoise');
memoiseModule.memoise = (key, fn) => fn();

describe('supported', () => {
    let supported;
    const performance = Object.getOwnPropertyDescriptor(window, 'performance');

    beforeEach(() => {
        supported = require('.').supported;
    });
    afterEach(() => {
        Object.defineProperty(window, 'performance', performance);
        delete require.cache[require.resolve('.')];
        supported = undefined;
    });

    it('Should be supported', () =>
        expect(supported()).to.be.true
    );

    it('Should return false when no performance object exists', () => {
        delete window.performance;
        expect(supported()).to.be.false;
    });
});
