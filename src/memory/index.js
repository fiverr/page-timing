import { number } from '../number';
import { snakeCase } from '../snake-case';

/**
 * @type {string[]}
 */
const METRICS = [
    'jsHeapSizeLimit',
    'totalJSHeapSize',
    'usedJSHeapSize'
];

/**
 * @returns {object}
 */
export function memory() {
    const { memory } = window.performance || {};
    if (!memory) {
        return {};
    }

    return Object.assign(
        ...METRICS.map(
            (metric) => ({ [snakeCase(metric)]: number(memory[metric]) })
        )
    );
}
