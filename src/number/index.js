const parseFloat = Number.parseFloat || window.parseFloat;
const isNaN = Number.isNaN || window.isNaN;
const isFinite = Number.isFinite || window.isFinite;
const { MAX_SAFE_INTEGER = 9007199254740991 } = Number;

/**
 * @param {number}
 * @returns {number?}
 */
export function number(input) {
    if (typeof input !== 'number') {
        return;
    }

    const value = parseFloat(input);

    if (isNaN(value)) {
        return;
    }

    if (value < 0) {
        return;
    }

    if (!isFinite(value)) {
        return;
    }

    if (value > MAX_SAFE_INTEGER) {
        return MAX_SAFE_INTEGER;
    }

    return value;
}

export {
    isNaN,
    isFinite
};
