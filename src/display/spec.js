import { display } from './index.js';

describe('display', () => {
    [
        'window_inner_height', 'window_inner_width',
        'screen_color_depth', 'screen_pixel_depth'
    ].forEach(
        (event) => it(
            `Screen metric ${event}`,
            async() => {
                const data = await display();
                expect(data).to.have.property(event);
                expect(data[event]).to.be.a('number');
            }
        )
    );

    it('Screen orientation', async() => {
        const data = await display();
        expect(data).to.have.property('screen_orientation_type');
        expect(data.screen_orientation_type).to.be.a('string');
    });
});
