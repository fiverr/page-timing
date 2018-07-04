describe('memoise', () => {
    let memoise;
    const key = {};

    beforeEach(() => {
        delete require.cache[require.resolve('.')];
        memoise = require('.').memoise;
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

    it('Should not be able to memoise by primitive', () =>
        [
            '',
            Symbol(),
            4,
        ].forEach((key) => expect(() => memoise(key, () => 'Thing')).to.throw())
    );
});
