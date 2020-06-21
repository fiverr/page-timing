import { navigation } from '../navigation';
import { paint } from '../paint';
import { assets } from '../assets';
import { connection } from '../connection';
import { memory } from '../memory';
import { display } from '../display';
import { dom } from '../dom';

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
    dom()
);
