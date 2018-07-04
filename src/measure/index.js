import { start } from '../start';

/**
 * Get the measurement diff from start
 * @param  {String} measurement
 * @return {Number}
 */
export const measure = (measurement) => Math.max(window.performance.timing[measurement] - start(), 0);
