import { navigation } from '../navigation/index.js';
import { paint } from '../paint/index.js';
import { assets } from '../assets/index.js';
import { connection } from '../connection/index.js';
import { memory } from '../memory/index.js';
import { display } from '../display/index.js';
import { dom } from '../dom/index.js';
import { elapsed } from '../elapsed/index.js';
import { all } from './index.js';

describe('all', () => {
    it('should collect information from all modules', () => {
        const result = all();
        const metrics = {
            ...navigation(),
            ...paint(),
            ...assets(),
            ...connection(),
            ...memory(),
            ...display(),
            ...dom(),
            ...elapsed()
        };

        expect(result.page_time_elapsed).to.be.a(typeof metrics.page_time_elapsed);
        expect(result.page_time_elapsed).to.be.a('number');

        delete result.page_time_elapsed;
        delete metrics.page_time_elapsed;

        expect(result).to.deep.equal(metrics);
    });
});
