export function elapsed() {
    const page_time_elapsed = window.performance.now();

    return Number.isFinite(page_time_elapsed)
        ? { page_time_elapsed }
        : {}
    ;
}
