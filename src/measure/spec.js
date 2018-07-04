const { measure } = require('.');

describe('measure', () => {
    const performance = Object.getOwnPropertyDescriptor(window, 'performance');

    afterEach(() =>
        Object.defineProperty(window, 'performance', performance)
    );

    it('Should return the diff between timing metric to start point', () => {
        window.performance = {
            timeOrigin: 100,
            timing: {
                something: 250,
            },
        };
        expect(measure('something')).to.equal(150);
    });
});
