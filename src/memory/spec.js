import { memory } from './index.js';

let data;

describe('memory', () => {
    before(() => {
        data = memory();
    });
    [
        'js_heap_size_limit',
        'total_js_heap_size',
        'used_js_heap_size'
    ].forEach(
        (event) => it(
            `${event} == number`,
            () => {
                expect(data).to.have.property(event);
                expect(data[event]).to.be.a('number');
            }
        )
    );
});
