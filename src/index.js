import PERFORMANCE_METRICS from './performance-metrics';
import { measure } from './measure';
import { supported } from './supported';

const DEFAULT_REDUCER = (accumulator, [key, value]) => [...accumulator, [key, value]];
const DEFAULT_ACCUMULATOR = [];

/**
 * An opinionated reducer on performance.timing object
 * @param  {Array}    [options.metrics]     Requested metrics
 * @param  {Function} [options.reducer]     Reducer function
 * @param  {Any}      [options.accumulator] Reducer accumulator
 * @return {Any}                     [description]
 */
export const pageTiming = ({metrics = PERFORMANCE_METRICS, reducer = DEFAULT_REDUCER, accumulator = DEFAULT_ACCUMULATOR} = {}) =>
    supported() ?
        metrics
            .reduce(
                (results, metric, index, metrics) => {

                    // Ignore invalid performance metrics
                    if (!PERFORMANCE_METRICS.includes(metric)) {
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
