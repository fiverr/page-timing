import { elapsed } from '.';

const { now } = window.performance;

describe('elapsed', () => {
    afterEach(() => {
        window.performance.now = now;
    });
    it('should returned the time elapsed since the time origin', () => {
        const { page_time_elapsed } = elapsed();
        expect(page_time_elapsed).to.be.a('number');
        expect(page_time_elapsed).to.be.at.least(50);
    });
    [
        null,
        0,
    ].forEach(
        (item) => it('should return "undefined" if falsy', () => {
            window.performance.now = () => item;
            const { page_time_elapsed } = elapsed();
            expect(page_time_elapsed).to.equal(undefined);
        })
    );
});
