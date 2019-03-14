import { start } from '../start';

/**
 * Get the measurement diff from start
 * @param  {String} entry
 * @return {Number}
 */
export const measurement = (entry) => Math.max(window.performance.timing[entry] - start(), 0);
