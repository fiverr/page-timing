import { number } from '../number';
import { snakeCase } from '../snake-case';

/**
 * @type {string[]}
 */
const METRICS = [
    'connectEnd',
    'connectStart',
    'decodedBodySize',
    'domainLookupEnd',
    'domainLookupStart',
    'domComplete',
    'domContentLoadedEventEnd',
    'domContentLoadedEventStart',
    'domInteractive',
    'domLoading',
    'duration',
    'encodedBodySize',
    'fetchStart',
    'loadEventEnd',
    'loadEventStart',
    'navigationStart',
    'redirectEnd',
    'redirectStart',
    'requestStart',
    'responseEnd',
    'responseStart',
    'secureConnectionStart',
    'transferSize',
    'unloadEventEnd',
    'unloadEventStart',
    'workerStart'
];

/**
 * @returns {object}
 */
export function navigation() {
    const { performance } = window;
    if (!performance || !performance.getEntriesByType) {
        return {};
    }

    const navigationEntries = performance.getEntriesByType('navigation');

    // PerformanceNavigationTiming interface
    if (navigationEntries.length) {
        return Object.assign(
            {},
            ...[].concat(
                ...navigationEntries.map(
                    (entry) => METRICS.filter(
                        (metric) => !Number.isNaN(entry[metric])
                    ).map(
                        (metric) => ({ [snakeCase(metric)]: number(entry[metric]) })
                    )
                )
            )
        );
    }

    // Fall back to obsolete PerformanceTiming interface
    const { timing } = performance;
    if (!timing) { return {}; }

    const start = performance.timeOrigin || timing.navigationStart;
    if (!start) { return {}; }

    return METRICS.reduce(
        (accumulator, metric) => {
            const value = timing[metric] - start;
            accumulator[snakeCase(metric)] = value < 0
                ? undefined
                : number(value)
            ;

            return accumulator;
        },
        {}
    );
}
