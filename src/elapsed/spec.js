import { elapsed } from './index.js';

const { now } = window.performance;

describe('elapsed', () => {
    afterEach(() => {
        window.performance.now = now;
    });
    it('should returned the time elapsed since the time origin', async() => {
        const { page_time_elapsed } = await elapsed();
        expect(page_time_elapsed).to.be.a('number');
        expect(page_time_elapsed).to.be.at.least(50);
    });
    [
        4,
        0,
        -10,
        1e3
    ].forEach(
        (value) => it('should return the result of "performance.now" function', async() => {
            window.performance.now = () => value;
            const { page_time_elapsed } = await elapsed();
            expect(page_time_elapsed).to.equal(value);
        })
    );
    [
        null,
        '4',
        Infinity,
        NaN
    ].forEach(
        (value) => it('should be undefined if not a finite number', async() => {
            window.performance.now = () => value;
            const result = await elapsed();
            expect(result).to.not.have.key('page_time_elapsed');
            const { page_time_elapsed } = result;
            expect(page_time_elapsed).to.equal(undefined);
        })
    );
});
