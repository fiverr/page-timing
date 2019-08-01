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

    it('Should uses the getter to retrieve the value', () =>
        expect(memoise({}, () => 'Thang')).to.equal('Thang')
    );

    it('Should memoise the result', () => {
        memoise(key, () => 'Thing');
        expect(memoise(key, () => 'Thang')).to.equal('Thing');
        expect(memoise(key, () => 'Thong')).to.equal('Thing');
    });

    it('Should throw error when trying to memoise primitives', () =>
        [
            '',
            Symbol(),
            4
        ].forEach((key) => expect(() => memoise(key, () => 'Thing')).to.throw())
    );

    it('Should fall back to using an object when weakmap is not available', () => {
        global.WeakMap = null;
        delete require.cache[require.resolve('.')];
        memoise = require('.').memoise;

        expect(() => memoise(key, () => 'Thang')).not.to.throw();
        expect(memoise(key, () => 'Thang')).to.equal('Thang');
        expect(memoise(key, () => 'Thong')).not.to.equal('Thang');
    });
});
