import { getEntriesByTypeMock } from '../../spec-helpers';
import { paint } from '.';

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
            () => {
                const data = paint();
                expect(data).to.have.property(event);
                expect(data[event]).to.be.a('number');
            }
        )
    );
});
