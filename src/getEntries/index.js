/**
 * Retrieve list of PerformanceTiming objects via promise
 * @param {string}
 * @returns {Promise<PerformanceEntry[]>}
 */
export const getEntries = (...entryTypes) => new Promise(
    (resolve, reject) => {
        if (!window.performance) {
            reject(new Error('Performance API is not supported'));
            return;
        }

        if (!entryTypes.length) {
            reject(new TypeError('A Performance Observer must have a non-empty entryTypes attribute'));
            return;
        }

        const entries = [].concat(
            ...entryTypes.map(
                (entryType) => window.performance.getEntriesByType(entryType)
            )
        );

        if (entries.length) {
            resolve(entries);
            return;
        }

        if (typeof window.PerformanceObserver !== 'function') {
            reject(new Error('PerformanceObserver is not supported'));
            return;
        }

        const observer = new window.PerformanceObserver(
            (entryList, observer) => {
                resolve(entryList.getEntries());
                observer.disconnect();
            }
        );

        observer.observe({ entryTypes });
    }
);
