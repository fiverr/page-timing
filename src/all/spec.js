import { purge } from '../../spec-helpers';

let all;
const navigation = { navigation: Symbol() };
const paint = { paint: Symbol() };
const assets = { assets: Symbol() };
const connection = { connection: Symbol() };
const memory = { memory: Symbol() };
const display = { display: Symbol() };
const dom = { dom: Symbol() };

describe('all', () => {
    before(() => {
        Object.entries({
            navigation,
            paint,
            assets,
            connection,
            memory,
            display,
            dom
        }).forEach(
            ([key, value]) => {
                require(`../${key}`);
                require.cache[require.resolve(`../${key}`)].exports = {
                    [key]: () => value
                };
            }
        );

        all = require('.').all;
    });
    after(() => {
        purge();
    });
    it('should collect information from all modules', () => {
        expect(
            all()
        ).to.deep.equal(
            {
                ...navigation,
                ...paint,
                ...assets,
                ...connection,
                ...memory,
                ...display,
                ...dom
            }
        );
    });

    it('should create a new object', () => {
        [
            navigation,
            paint,
            assets,
            connection,
            memory,
            display,
            dom
        ].forEach((item) => expect(all()).not.to.equal(item));
    });
});
