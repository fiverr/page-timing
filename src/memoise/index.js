const mem = new WeakMap();

/**
 * Memoises value by reference
 * @param  {Object}   key
 * @param  {Function} fn
 * @return {Any}
 */
export const memoise = (key, fn) => mem.has(key) ? mem.get(key) : mem.set(key, fn()).get(key);
