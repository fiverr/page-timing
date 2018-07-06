const { performanceMetrics } = require('.');
const IGNORE = [
    'toJSON',
];

describe('performance-metrics', () => {
    it('Default should include all performance metrics', () => {
        const windowMetrics = Object.keys(window.performance.timing.constructor.prototype)
            .filter((item) => !IGNORE.includes(item));

        expect(performanceMetrics()).to.have.members(windowMetrics);
    });

    it('Should pass an empty array', () => {
        expect(performanceMetrics([])).to.have.lengthOf(0);
    });

    it('Should ignore metrics that are not valid', () => {
        expect(performanceMetrics(['domInteractive', 'loadEventEnd', 'another'])).to.have.lengthOf(2);
    });
});
