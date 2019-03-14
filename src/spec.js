import { pageTiming } from '.';

const WAIT_FOR = 400;

describe('page-timing', async() => {
    it('Should return result by default', async() => {
        await onload();
        await wait(WAIT_FOR);
        const measurements = pageTiming();
        expect(measurements).to.have.lengthOf.at.least(5);
    });

    it('Should collect metrics as arrays of [key, value]', async() => {
        await onload();
        await wait(WAIT_FOR);
        const measurements = pageTiming({
            metrics: ['domInteractive', 'loadEventEnd'],
        });
        expect(measurements).to.have.lengthOf(2);
        measurements.forEach(
            ([key, value]) => {
                expect(key).to.be.a('string');
                expect(value).to.be.a('number');
            }
        );
    });

    it('Should format metrics', async() => {
        await onload();
        await wait(WAIT_FOR);
        const [interactive, load] = pageTiming({
            metrics: ['domInteractive', 'loadEventEnd'],
            reducer: (accumulator, [key, value]) => [
                ...accumulator,
                ['prefix', key, Math.round(value)].join(':'),
            ],
        });

        expect(interactive).to.match(/prefix:domInteractive:(\d{2,4})/);
        expect(load).to.match(/prefix:loadEventEnd:(\d{2,4})/);
    });
});
