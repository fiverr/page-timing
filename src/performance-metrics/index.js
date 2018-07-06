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

export const performanceMetrics = (metrics) => Array.isArray(metrics) ?
    metrics.filter((metric) => PERFORMANCE_METRICS.includes(metric))
    :
    PERFORMANCE_METRICS
;
