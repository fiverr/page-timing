export const elapsed = () => ({
    page_time_elapsed: window.performance.now() || undefined
});
