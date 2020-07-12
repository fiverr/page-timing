/**
 * @param {number}
 * @returns {number?}
 */
export function number(input) {
    if (typeof input !== 'number') {
        return;
    }

    const value = Number.parseFloat(input);

    if (Number.isNaN(value)) {
        return;
    }

    if (value < 0) {
        return;
    }

    if (Number.isFinite(value)) {
        return value;
    }
}
