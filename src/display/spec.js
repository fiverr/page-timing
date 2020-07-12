import { display } from '.';

describe('display', () => {
    [
        'window_inner_height', 'window_inner_width',
        'screen_color_depth', 'screen_pixel_depth'
    ].forEach(
        (event) => it(
            `Screen metric ${event}`,
            () => {
                const data = display();
                expect(data).to.have.property(event);
                expect(data[event]).to.be.a('number');
            }
        )
    );

    it('Screen orientation', () => {
        const data = display();
        expect(data).to.have.property('screen_orientation_type');
        expect(data.screen_orientation_type).to.be.a('string');
    });
});
