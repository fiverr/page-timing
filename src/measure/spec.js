import sleep from '@lets/sleep';
import wait from '@lets/wait';
import { measure } from '.';

describe('measure', () => {
    beforeEach(() => {
        performance.clearMarks();
    });
    it('Should add a measure entry for an async function', async() => {
        await measure(
            async() => await wait(50),
            'my-function'
        );
        const [{ duration, name }] = performance.getEntriesByType('measure');

        expect(name).to.equal('my-function');
        expect(duration).to.be.at.least(50);
        expect(duration).to.be.at.most(100);
    });
    it('Should add a measure entry for a sync function', () => {
        measure(
            () => sleep(50),
            'my-function'
        );

        const [{ duration, name }] = performance.getEntriesByType('measure');

        expect(name).to.equal('my-function');
        expect(duration).to.be.at.least(50);
        expect(duration).to.be.at.most(100);
    });
    it('Should return original function return value', async() => {
        const result = await measure(
            async() => {
                await wait(50);
                return [1, 2, 3];
            },
            'my-function'
        );
        expect(result).to.deep.equal([1, 2, 3]);
    });
});
