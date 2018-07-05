import { memoise } from '../memoise';
const key = {};

export const supported = () => memoise(key, () => window.hasOwnProperty('performance') && window.hasOwnProperty('Performance') && (performance instanceof Performance));
