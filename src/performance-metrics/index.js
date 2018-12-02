const PERFORMANCE_METRICS = [
    'connectEnd',
    'connectStart',
    'domComplete',
    'domContentLoadedEventEnd',
    'domContentLoadedEventStart',
    'domInteractive',
    'domLoading',
    'domainLookupEnd',
    'domainLookupStart',
    'fetchStart',
    'loadEventEnd',
    'loadEventStart',
    'navigationStart',
    'redirectEnd',
    'redirectStart',
    'requestStart',
    'responseEnd',
    'responseStart',
    'secureConnectionStart',
    'unloadEventEnd',
    'unloadEventStart',
];

/**
 * Filter a given list from unsupported performance metrics. Empty list returns all
 * @param  {String[]} metrics
 * @return {String}
 */
export const performanceMetrics = (metrics) => Array.isArray(metrics) ?
    metrics.filter((metric) => PERFORMANCE_METRICS.includes(metric))
    :
    PERFORMANCE_METRICS
;
