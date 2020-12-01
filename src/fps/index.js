/**
 * Check window frames per second rate
 * @param {number} sample Number of seconds to check
 * @returns {number?}
 */
export const fps = ({ sample = 1 } = {}) => new Promise(
    ((resolve) => {
        const { requestAnimationFrame } = window;
        if (!requestAnimationFrame) {
            resolve(undefined);
        }

        const start = window.performance.now();
        const end = start + (1000 * sample);
        let frames = 0;
        requestAnimationFrame(count);

        function count() {
            if (window.performance.now() > end) {
                resolve(frames / sample);
            } else {
                ++frames;
                requestAnimationFrame(count);
            }
        }
    })
);
