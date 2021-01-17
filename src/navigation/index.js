import { getEntries } from '../getEntries/index.js';
import { number, isNaN } from '../number/index.js';
import { snakeCase } from '../snake-case/index.js';

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
    'redirectCount',
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
export async function navigation() {
    const { performance } = window;
    if (!performance || !performance.getEntriesByType) {
        return {};
    }

    const [ navigation ] = await getEntries('navigation');

    if (navigation) {
        return Object.assign(
            ...METRICS.filter(
                (metric) => !isNaN(navigation[metric])
            ).map(
                (metric) => ({ [snakeCase(metric)]: number(navigation[metric]) })
            )
        );
    }

    // Fall back to obsolete PerformanceTiming interface
    const { timing } = performance;
    if (!timing) { return {}; }

    const start = performance.timeOrigin || timing.navigationStart;
    if (!start) { return {}; }

    const result = METRICS.reduce(
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

    return result;
}
