describe('memoise', () => {
    const weakMap = global.WeakMap;
    let memoise;
    const key = {};

    beforeEach(() => {
        delete require.cache[require.resolve('.')];
        memoise = require('.').memoise;
    });

    after(() => {
        global.WeakMap = weakMap;
    });

    it('Should uses the getter to retrieve the value', () => {
        memoise(key, () => 'Thang');
        expect(memoise(key)).to.equal('Thang');
    });

    it('Should return the value', () =>
        expect(memoise(key, () => 'Thang')).to.equal('Thang')
    );

    it('Should memoise the result', () => {
        memoise(key, () => 'Thing');
        memoise(key, () => 'Thang');
        expect(memoise(key)).to.equal('Thing');
    });

    it('Should throw error when trying to memoise primitives', () =>
        [
            '',
            Symbol(),
            4,
        ].forEach((key) => expect(() => memoise(key, () => 'Thing')).to.throw())
    );

    it('Should fall back to using an object when weakmap is not available', () => {
        global.WeakMap = null;
        delete require.cache[require.resolve('.')];
        memoise = require('.').memoise;

        memoise(key, () => 'Thang');
        expect(memoise(key)).to.equal('Thang');
    });
});
