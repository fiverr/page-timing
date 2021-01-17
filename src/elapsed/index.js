import { isFinite } from '../number/index.js';

export async function elapsed() {
    const page_time_elapsed = window.performance.now();

    return isFinite(page_time_elapsed)
        ? { page_time_elapsed }
        : {}
    ;
}
