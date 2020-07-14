import { elapsed } from '.';

describe('elapsed', () => {
    it('should returned the time elapsed since the time origin', () => {
        const { page_time_elapsed } = elapsed();
        expect(page_time_elapsed).to.be.a('number');
        expect(page_time_elapsed).to.be.at.least(50);
    });
});
