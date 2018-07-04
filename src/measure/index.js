import { start } from '../start';

/**
 * Get the measurement diff from start
 * @param  {String} measurement
 * @return {Number}
 */
export const measure = (measurement) => {
    const t = window.performance.timing[measurement];

    return t > start() ? t - start() : 0;
};
