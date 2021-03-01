import { getEntries } from '../getEntries/index.js';
import { getType } from '../get-type/index.js';
import { number, isNaN } from '../number/index.js';

const FINAL_ASSET_PREFIX = 'final_asset';

/**
 * @returns {object}
 */
export async function assets() {
    if (!window.performance || !window.performance.getEntriesByType) {
        return {};
    }

    const metrics = {};
    const caches = {};
    const entries = await getEntries('resource');

    for (const entry of entries) {
        const type = await getType(entry);
        add(metrics, type, 'count', 1);
        add(metrics, type, 'load', entry.duration);
        add(metrics, type, 'size', entry.decodedBodySize);
        cache(caches, type, entry.duration);
    }

    for (const type in caches) {
        add(metrics, type, 'hitrate', caches[type].hit / caches[type].total);
    }

    for (const key in metrics) {
        if (isNaN(metrics[key])) {
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

/**
 * Mutating
 * @param {object} accumulator
 * @param {string} type
 * @param {number} duration (0 for cache hit and more for cache miss)
 * @returns {void}
 */
function cache(accumulator, type, duration) {
    accumulator[type] = accumulator[type] || {};
    accumulator[type].total = accumulator[type].total || 0;
    accumulator[type].hit = accumulator[type].hit || 0;

    accumulator[type].total++;
    accumulator[type].hit += +!duration;
}
