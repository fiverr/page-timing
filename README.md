# page-timing
Measure browser page performance timing and reduce it to a results object using the [navigation timing API](https://www.w3.org/TR/navigation-timing/)

This program collects each metrics' total time from `timeOrigin` (falls back to `navigationStart`), so metric calculations can be performed by the analyser, wherever the data is reported to.

## Usage

### Basic use
```js
import { pageTiming } from 'page-timing';
const metrics = ['domInteractive', 'loadEventEnd'];

pageTiming({metrics});

console.log(...results);
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

### Key value pairs
```js
const now = Date.now();
const reducer = (accumulator, [key, value]) =>
  [...accumulator, `browser_performance.${page_name}.${key}:${parseInt(value)}|ms`]
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
  "browser_performance.homepage_loggedout.domInteractive:208|ms",
  "browser_performance.homepage_loggedout.loadEventEnd:431|ms"
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
  "metrics": {
    "domInteractive": 208.01,
    "loadEventEnd": 431.01
  },
  "page": "homepage_loggedout"
}
```
## Calculations used to analyse the results

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

![](https://www.w3.org/TR/navigation-timing/timing-overview.png)
