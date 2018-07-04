const PERFORMANCE_METRICS = require('.');
const IGNORE = [
    'toJSON',
];

describe('performance-metrics', () => {
    it('Should include all performance metrics', () => {
        expect(PERFORMANCE_METRICS).to.have.members(
            Object.keys(window.performance.timing.constructor.prototype)
                .filter((item) => !IGNORE.includes(item))
        );
    });
});
