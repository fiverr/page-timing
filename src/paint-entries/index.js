const all = () => window.performance.getEntriesByType ? window.performance.getEntriesByType('paint') : [];

/**
 * Retrieve all paint entries. Filter if needed
 * @param  {String[]} metrics
 * @return {String}
 */
export const paintEntries = (metrics) => metrics ? all().filter(({name}) => metrics.includes(name)) : all();
