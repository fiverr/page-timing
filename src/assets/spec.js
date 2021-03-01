import { getEntriesByTypeMock } from '../../spec-helpers/index.js';
import { assets } from './index.js';

const { getEntriesByType } = window.performance;
const PREFIX = 'final_asset';
const types = [ 'images', 'javascript', 'stylesheets', 'other' ];
const metrics = [ 'count', 'load', 'size', 'hitrate' ];
let data;

describe('assets', () => {
    before(async() => {
        window.performance.getEntriesByType = getEntriesByTypeMock;
        data = await assets();
        console.log(data);
    });
    after(() => {
        window.performance.getEntriesByType = getEntriesByType;
    });

    types.map(
        (type) => metrics.map(
            (metric) => [ PREFIX, type, metric ].join('_')
        )
    ).flat().forEach(
        (event) => it(
            event,
            async() => {
                expect(data).to.have.property(event);
                expect(data[event]).to.be.a('number');
            }
        )
    );
});
