let memoise;

try {
    const mem = new WeakMap();
    memoise = (key, fn) => mem.has(key) ? mem.get(key) : mem.set(key, fn()).get(key);
} catch (e) {
    const mem = {};
    memoise = (key, fn) => mem.hasOwnProperty(key) ? mem[key] : mem[key] = fn();
}

/**
 * Memoises value by reference
 * @param  {Object}   key
 * @param  {Function} fn
 * @return {Any}
 */
export { memoise };
