const { performanceMetrics } = require('.');
const IGNORE = [
    'toJSON',
];

describe('performance-metrics', () => {
    it('Should include all performance metrics', () => {
        const metrics = Array.from(performanceMetrics);
        const windowMetrics = Object.keys(window.performance.timing.constructor.prototype)
            .filter((item) => !IGNORE.includes(item));

        expect(metrics).to.have.members(windowMetrics);
    });
});
