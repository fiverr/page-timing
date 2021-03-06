import { getEntriesByTypeMock } from '../../spec-helpers/index.js';
import { paint } from './index.js';

const { getEntriesByType } = window.performance;

describe('paint', () => {
    before(() => {
        window.performance.getEntriesByType = getEntriesByTypeMock;
    });
    after(() => {
        window.performance.getEntriesByType = getEntriesByType;
    });
    [
        'first_contentful_paint',
        'first_paint'
    ].forEach(
        (event) => it(
            event,
            async() => {
                const data = await paint();
                expect(data).to.have.property(event);
                expect(data[event]).to.be.a('number');
            }
        )
    );
});
