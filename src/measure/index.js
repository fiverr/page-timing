/**
 * Add a 'measure' entry measuring the execution of a function
 * @param  {Function} fn
 * @param  {String}   name
 * @return {Any}           original method return value
 */
export async function measure(fn, name) {
    const { performance } = window;
    const unique = Math.random().toString(32).substr(2);

    const [start, end] = ['start', 'end'].map(
        (suffix) => [name, suffix, unique].join('-')
    );

    performance.mark(start);
    const result = await fn();

    performance.mark(end);
    performance.measure(name, start, end);
    performance.clearMarks(start);
    performance.clearMarks(end);

    return result;
}
