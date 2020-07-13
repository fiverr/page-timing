const parseFloat = Number.parseFloat || window.parseFloat;
const isNaN = Number.isNaN || window.isNaN;
const isFinite = Number.isFinite || window.isFinite;

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

    if (isFinite(value)) {
        return value;
    }
}
