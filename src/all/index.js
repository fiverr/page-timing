import { navigation } from '../navigation/index.js';
import { paint } from '../paint/index.js';
import { assets } from '../assets/index.js';
import { connection } from '../connection/index.js';
import { memory } from '../memory/index.js';
import { display } from '../display/index.js';
import { dom } from '../dom/index.js';
import { elapsed } from '../elapsed/index.js';

/**
 * @returns {object}
 */
export const all = () => Object.assign(
    {},
    navigation(),
    paint(),
    assets(),
    connection(),
    memory(),
    display(),
    dom(),
    elapsed()
);
