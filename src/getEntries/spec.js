import { getEntries } from './index.js';

const { performance } = window;

describe('getEntries', () => {
    afterEach(() => {
        Object.assign(
            window,
            { performance }
        );
    });
    it('should return an empty object when performance API is not supported', async() => {
        delete window.performance;
        return expect(getEntries('navigation')).to.be.rejectedWith('Performance API is not supported');
    });
    it(
        'should return an empty object when no entryTypes were passed through',
        async() => expect(
            getEntries()
        ).to.be.rejectedWith(
            'A Performance Observer must have a non-empty entryTypes attribute'
        )
    );
    it('should return matching entries list by type', async() => {
        const records = await getEntries('resource');
        expect(records).to.have.lengthOf.at.least(5);
        records.forEach(
            (record) => expect(record).to.be.instanceof(PerformanceResourceTiming)
        );
    });
    it('should return matching entries if they already exist', async() => {
        expect(
            window.performance.getEntriesByType('navigation')
        ).to.have.lengthOf(1);

        const [ navigation ] = await getEntries('navigation');
        expect(navigation).to.be.instanceof(PerformanceNavigationTiming);
    });
    it('should collect multiple types of events and not wait for missing items', async() => {
        const entries = await getEntries('first-input', 'navigation', 'resource', 'paint');
        const types = entries.map(
            ({ entryType }) => entryType
        );
        expect(types).to.include('navigation');
        expect(types).to.include('resource');
        expect(types).not.to.include('paint');
        expect(types).not.to.include('first-input');
    });
});
