import { getLCP, getFID, getCLS } from 'web-vitals';
import TTI from 'tti-polyfill';
import { measure, fps, all } from '../src/index.js';

Object.assign(
    window,
    { measure, fps, all, getLCP, getFID, getCLS, TTI }
);
