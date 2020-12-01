import { getEntries } from '../getEntries/index.js';
import { getType } from '../get-type/index.js';
import { number } from '../number/index.js';

const FINAL_ASSET_PREFIX = 'final_asset';

/**
 * @returns {object}
 */
export async function assets() {
    if (!window.performance || !window.performance.getEntriesByType) {
        return {};
    }

    const metrics = {};
    const entries = await getEntries('resource');

    for (const entry of entries) {
        const type = await getType(entry);
        add(metrics, type, 'count', 1);
        add(metrics, type, 'load', entry.duration);
        add(metrics, type, 'size', entry.decodedBodySize);
    }

    for (const key in metrics) {
        if (Number.isNaN(metrics[key])) {
            metrics[key] = undefined;
        }
    }

    return metrics;
}

/**
 * Mutating
 * @param {object} accumulator
 * @param {string} type
 * @param {string} key
 * @param {number} value
 * @returns {void}
 */
function add(accumulator, type, key, value) {
    const field = [FINAL_ASSET_PREFIX, type, key].join('_');

    accumulator[field] = accumulator[field] || 0;
    accumulator[field] += number(value) || 0;
}
