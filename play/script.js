import { getLCP, getFID, getCLS } from 'web-vitals';
import { measure, fps, all } from '../src/index.js';

Object.assign(
    window,
    { measure, fps, all, getLCP, getFID, getCLS }
);
