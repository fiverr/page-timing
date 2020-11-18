import { all } from './index.js';

const calls = [];

describe('all', () => {
    before(() => {
        const { all } = Promise;
        Promise.all = (...args) => {
            calls.push(args);
            return all.apply(Promise, args);
        };
    });
    after(() => {
        Promise.all = all;
    });
    it('should collect information from all modules', async() => {
        all();
        const [ [ functions ] ] = calls;
        expect(functions).to.have.lengthOf(8);

        const [
            navigation,
            paint,
            assets,
            connection,
            memory,
            display,
            dom,
            elapsed
        ] = functions;

        [
            navigation,
            paint,
            assets,
            connection,
            memory,
            display,
            dom,
            elapsed
        ].forEach(
            (item) => expect(item).to.be.an.instanceof(Promise)
        );

        const { page_time_elapsed } = await elapsed;
        expect(page_time_elapsed).to.be.a('number');
    });
});
