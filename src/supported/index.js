import { memoise } from '../memoise';
const key = {};

/**
 * Check if the browser supports performance API
 * @return {Boolean}
 */
export const supported = () => memoise(key, () => window.hasOwnProperty('performance') && window.hasOwnProperty('Performance') && (performance instanceof Performance));
