const { paintEntries } = require('.');

describe('paint-entries', () => {
    const getEntriesByType = window.performance.getEntriesByType;
    before(() => {
        window.performance.getEntriesByType = () => [
            {
                name: 'first-paint',
                entryType: 'paint',
                startTime: 2505276.299999998,
                duration: 0,
            },
            {
                name: 'first-contentful-paint',
                entryType: 'paint',
                startTime: 2505276.299999998,
                duration: 0,
            },
        ];
    });
    after(() => {
        window.performance.getEntriesByType = getEntriesByType;
    });
    it('Should report all reported paintEntries', () => {
        const entries = paintEntries();
        expect(entries).to.have.lengthOf(2);
    });
    it('Should filter only wanted metrics', () => {
        const entries = paintEntries(['first-paint']);
        expect(entries).to.have.lengthOf(1);
    });
});
