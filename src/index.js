import { performanceMetrics } from './performance-metrics';
import { measure } from './measure';
import { supported } from './supported';

const DEFAULT_REDUCER = (accumulator, [key, value]) => [...accumulator, [key, value]];
const DEFAULT_ACCUMULATOR = [];

/**
 * An opinionated reducer on performance.timing object
 * @param  {String[]} [options.metrics]     Requested metrics
 * @param  {Function} [options.reducer]     Reducer function
 * @param  {Any}      [options.accumulator] Reducer accumulator
 * @return {Any}
 */
export const pageTiming = ({metrics = performanceMetrics, reducer = DEFAULT_REDUCER, accumulator = DEFAULT_ACCUMULATOR} = {}) =>
    supported() ?
        Array.from(metrics)
            .reduce(
                (results, metric, index, metrics) => {

                    // Ignore invalid performance metrics
                    if (!performanceMetrics.has(metric)) {
                        return results;
                    }
                    const value = measure(metric);

                    // Ignore empty entries
                    if (value <= 0) {
                        return results;
                    }

                    return reducer(results, [metric, value], index, metrics);
                },
                accumulator
            )
        :
        accumulator
    ;
