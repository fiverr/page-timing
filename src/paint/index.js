import { getEntries } from '../getEntries/index.js';
import { number } from '../number/index.js';
import { snakeCase } from '../snake-case/index.js';

/**
 * Retrieve all paint entries
 * @returns {object}
 */
export async function paint() {
    const { performance } = window;

    if (!performance || !performance.getEntriesByType) {
        return {};
    }

    const entries = await getEntries('paint');

    return Object.assign(
        {},
        ...[].concat(
            ...entries.map(
                ({ name, startTime }) => ({ [snakeCase(name)]: number(startTime) })
            )
        )
    );
}
