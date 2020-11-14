import { number } from '../number/index.js';
import { snakeCase } from '../snake-case/index.js';

/**
 * Retrieve all paint entries
 * @returns {object}
 */
export function paint() {
    const { performance } = window;

    if (!performance || !performance.getEntriesByType) {
        return {};
    }

    return Object.assign(
        {},
        ...[].concat(
            ...performance.getEntriesByType('paint').map(
                ({ name, startTime }) => ({ [snakeCase(name)]: number(startTime) })
            )
        )
    );
}
