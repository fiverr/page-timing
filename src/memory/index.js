import { number } from '../number/index.js';
import { snakeCase } from '../snake-case/index.js';

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
export async function memory() {
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
