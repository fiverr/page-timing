/**
 * Check window frames per second rate
 * @param {function} filter
 * @param {number} limit
 * @returns {number?}
 */
export const cachehit = ({ filter = () => true, limit = 50 } = {}) => new Promise(
    ((resolve, reject) => {
        try {
            const entries = window.performance.getEntriesByType('resource').filter(filter);
            console.log(entries.length);

            if (!entries.length) {
                resolve(undefined);
                return;
            }

            const cached = entries.filter(
                ({ duration }) => duration < limit
            );
            resolve(
                cached.length / entries.length
            );
        } catch (error) {
            reject(error);
        }
    })
);
