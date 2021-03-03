import { getEntriesByTypeMock } from '../../spec-helpers/index.js';
import { cachehit } from './index.js';

const { getEntriesByType } = window.performance;

describe('cachehit', () => {
    before(() => {
        window.performance.getEntriesByType = getEntriesByTypeMock;
    });
    after(() => {
        window.performance.getEntriesByType = getEntriesByType;
    });
    it('should return all results cache hit rate', async() => {
        expect(await cachehit()).to.equal(0.2161290322580645);
    });
    it('should measure only a subset of the resources', async() => {
        expect(await cachehit({
            filter: ({ name }) => /.woff2?[$\?]/.test(name),
        })).to.equal(1);
    });
    it('should have a lower result for a different limit', async() => {
        expect(await cachehit({
            limit: 10
        })).to.equal(0.035483870967741936);
    });
    it('should return undefined when no matching entries were found', async() => {
        expect(await cachehit({
            filter: ({ name }) => name.includes('nothing.com')
        })).to.be.undefined;
    });
});
