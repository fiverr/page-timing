/**
 * @param {string}
 * @returns {string}
 */
export const snakeCase = (str) => str
    .replace(/([A-Z])/g, '_$1')
    .replace(/-/g, '_')
    .toLowerCase()
    .replace(/_j_s_/g, '_js_');
