import { memoise } from '../memoise';

const key = {};

/**
 * Check if the browser supports performance API
 * @return {Boolean}
 */
export const supported = () => memoise(key, () => ('performance' in window) && ('Performance' in window) && (performance instanceof Performance));
