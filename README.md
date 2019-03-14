# page-timing [![](https://img.shields.io/npm/v/page-timing.svg)](https://www.npmjs.com/package/page-timing) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/fiverr/page-timing) [![](https://circleci.com/gh/fiverr/page-timing.svg?style=svg)](https://circleci.com/gh/fiverr/page-timing) [![](https://badgen.net/bundlephobia/minzip/page-timing)](https://bundlephobia.com/result?p=page-timing)

⏱ Measure browser page performance timing and reduce it to a results object using the [navigation timing API](https://www.w3.org/TR/navigation-timing/)

This program collects each metrics' total time from `timeOrigin` (falls back to `navigationStart`), so metric calculations can be performed by the analyser, wherever the data is reported to.

Empty metrics (whose value is 0) will be omitted from the results.

## API
- [`pageTiming`](#pageTiming)
- [`measure`](#measure)

## pageTiming
Get a formatted object of page performance metrics.

```js
import { pageTiming } from 'page-timing';
const results = pageTiming();

fetch('/send-metrics', {
  method: 'POST',
  body: JSON.stringify(results),
});
```

The method accepts named arguments, all of which are optional
```js
const results = pageTiming({metrics: [], reducer: () => {}, accumulator = []});
```

| Key | Role | Type | Default value
| - | - | - | -
| `metrics` | The metrics you'd like to collect | Array | See full list below
| `reducer` | The reducer used to collect them | Function | `(a, [k, v]) => [...a, [k, v]]`
| `accumulator` | Initial data structure to reduce on | Any | `[]`

### Metrics list

##### [Navigation Timing](https://www.w3.org/TR/navigation-timing/#sec-navigation-timing-interface)
- `connectEnd`
- `connectStart`
- `domComplete`
- `domContentLoadedEventEnd`
- `domContentLoadedEventStart`
- `domInteractive`
- `domLoading`
- `domainLookupEnd`
- `domainLookupStart`
- `fetchStart`
- `loadEventEnd`
- `loadEventStart`
- `navigationStart`
- `redirectEnd`
- `redirectStart`
- `requestStart`
- `responseEnd`
- `responseStart`
- `secureConnectionStart`
- `unloadEventEnd`
- `unloadEventStart`

##### [Paint Timing](https://w3c.github.io/paint-timing/#sec-PerformancePaintTiming)
- `first-paint`
- `first-contentful-paint`

## Usage

### Basic use
```js
import { pageTiming } from 'page-timing';
const metrics = ['domInteractive', 'loadEventEnd'];

window.addEventListener('load', () => {
  send(pageTiming({metrics}));
});
```
Output
```json
[
  [
    "domInteractive",
    208.010986328125
  ],
  [
    "loadEventEnd",
    431.010986328125
  ]
]
```

### StatsD messages format
```js
import {snakeCase} from 'lodash';

const now = Date.now();
const reducer = (accumulator, [key, value]) =>
  [...accumulator, `browser_performance.${page_name}.${snakeCase(key)}:${parseInt(value)}|ms`]
;
const results = pageTiming({
    reducer,
    metrics,
});

sendMetricsToStatsD(...results);
```
Output
```json
[
  "browser_performance.homepage_loggedout.dom_interactive:208|ms",
  "browser_performance.homepage_loggedout.first_contentful_paint:316|ms",
  "browser_performance.homepage_loggedout.load_event_end:431|ms"
]
```

### Enriched objects
```js
const reducer = (accumulator, [key, value]) => Object.assign(
    accumulator,
    {[key]: parseFloat(value.toFixed(2))}
);
const event = {
    group: "performance",
    type: "browser_performance",
    timings: {},
    page: "homepage_loggedout"
};
pageTiming({
    reducer,
    accumulator: event.timings,
    metrics,
});

sendPreformanceEvent(event);
```
Output
```json
{
  "group": "performance",
  "type": "browser_performance",
  "timings": {
    "domInteractive": 208.01,
    "loadEventEnd": 431.01
  },
  "page": "homepage_loggedout"
}
```

## measure
Wrap a function and measure it's execution time in milliseconds into a [performance measure](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure) entry.

```js
import { measure } from 'page-timing';

await pageTiming.measure(wait, 'my-function');

// Example: Convert entries to a named array
performance.getEntriesByType('measure').reduce(
  (accumulator, {name, duration}) => Object.assign(accumulator, {[name]: duration}),
  {}
);
// {my-function: 53.35999990347773}

// Example: Retrieve a specific entry
const { duration } = performance.getEntriesByType('measure')
  .find(({name}) => name === 'my-function');
// 53.35999990347773
```

## Dist
Browser entry (dist) exposes methods as `pageTiming.pageTiming` and `pageTiming.measure`:

```js
const results = window.pageTiming.pageTiming(); // [...]

window.pageTiming.measure(myFunction, 'my-function');
```


## Calculations used to analyse the performance results

| Meaning | Calculation
| - | -
| Total time from start to load | `loadEventEnd - navigationStart`
| Time spent constructing the DOM tree | `domComplete - domInteractive`
| Time consumed preparing the new page | `timing.fetchStart - navigationStart`
| Time spent during redirection | `redirectEnd - redirectStart`
| AppCache | `domainLookupStart - fetchStart`
| Time spent unloading documents | `unloadEventEnd - unloadEventStart`
| DNS query time | `domainLookupEnd - domainLookupStart`
| TCP connection time | `connectEnd - connectStart`
| Time spent during the request | `responseEnd - requestStart`
| Request to completion of the DOM loading | `domInteractive - responseEnd`
| Load event time | `loadEventEnd - loadEventStart`
| download Time | `responseEnd - responseStart`
| DOM Content loaded event time | `domContentLoadedEventEnd - domContentLoadedEventStart`

[![](https://www.w3.org/TR/navigation-timing/timing-overview.png)](https://www.w3.org/TR/navigation-timing/)
