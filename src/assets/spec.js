import { getEntriesByTypeMock } from '../../spec-helpers/index.js';
import { assets } from './index.js';

const { getEntriesByType } = window.performance;

describe('assets', () => {
    before(() => {
        window.performance.getEntriesByType = getEntriesByTypeMock;
    });
    after(() => {
        window.performance.getEntriesByType = getEntriesByType;
    });

    [
        'final_asset_other_count', 'final_asset_other_load', 'final_asset_other_size',
        'final_asset_stylesheets_count', 'final_asset_stylesheets_load', 'final_asset_stylesheets_size',
        'final_asset_javascript_count', 'final_asset_javascript_load', 'final_asset_javascript_size',
        'final_asset_images_count', 'final_asset_images_load', 'final_asset_images_size'
    ].forEach(
        (event) => it(
            event,
            () => {
                const data = assets();
                expect(data).to.have.property(event);
                expect(data[event]).to.be.a('number');
            }
        )
    );
});
