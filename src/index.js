import { performanceMetrics } from './performance-metrics';
import { measure } from './measure';
import { supported } from './supported';

const DEFAULT_REDUCER = (accumulator, [key, value]) => [...accumulator, [key, value]];

/**
 * An opinionated reducer on performance.timing object
 * @param  {String[]} [options.metrics]     Requested metrics
 * @param  {Function} [options.reducer]     Reducer function
 * @param  {Any}      [options.accumulator] Reducer accumulator
 * @return {Any}
 */
export const pageTiming = ({metrics, reducer = DEFAULT_REDUCER, accumulator = []} = {}) =>
    supported() ?
        performanceMetrics(metrics)
            .reduce(
                (results, metric, index, metrics) => {
                    const value = measure(metric);

                    return value > 0 ?
                        reducer(results, [metric, value], index, metrics)
                        :
                        results
                    ;
                },
                accumulator
            )
        :
        accumulator
;
