import { performanceMetrics } from './performance-metrics';
import { paintEntries } from './paint-entries';
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
export function pageTiming({metrics, reducer = DEFAULT_REDUCER, accumulator = []} = {}) {
    if (!supported()) {
        return accumulator;
    }

    accumulator = performanceMetrics(metrics)
        .reduce(
            (accumulator, metric, index, metrics) => {
                const value = measure(metric);

                return value > 0 ?
                    reducer(accumulator, [metric, value], index, metrics)
                    :
                    accumulator
                ;
            },
            accumulator
        );

    accumulator = paintEntries(metrics)
        .reduce(
            (accumulator, {name, startTime}, index, metrics) =>
                startTime > 0
                    ?
                    reducer(accumulator, [name, startTime], index, metrics)
                    :
                    accumulator
            ,
            accumulator
        );

    return accumulator;
}
