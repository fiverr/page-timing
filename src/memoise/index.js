/**
 * Memoises value by reference
 * @param  {Object}   key
 * @param  {Function} fn
 * @return {Any}
 */
export const memoise = (() => {
    if (typeof WeakMap !== 'function') {
        return (key, fn) => fn();
    }
    const mem = new WeakMap();
    return (key, fn) => mem.has(key) ? mem.get(key) : mem.set(key, fn()).get(key);
})();
