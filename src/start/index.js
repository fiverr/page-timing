import { memoise } from '../memoise';
const key = {};

/**
 * Get the measurement diff from start
 * @param  {String} measurement
 * @return {Number}
 */
export const start = () => memoise(key, () => window.performance.timeOrigin || window.performance.timing.navigationStart);
