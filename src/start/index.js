import { memoise } from '../memoise';
const key = {};

export const start = () => memoise(key, () => window.performance.timeOrigin || window.performance.timing.navigationStart);
