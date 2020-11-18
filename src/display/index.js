import { number } from '../number/index.js';

/**
 * @returns {object}
 */
export async function display() {
    const result = {
        window_inner_height: number(window.innerHeight),
        window_inner_width: number(window.innerWidth)
    };

    const { screen } = window;
    screen && Object.assign(result, {
        screen_color_depth: number(screen.colorDepth),
        screen_pixel_depth: number(screen.pixelDepth),
        screen_orientation_type: screen.orientation && screen.orientation.type
    });

    return result;
}
