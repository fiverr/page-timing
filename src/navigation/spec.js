import { navigation } from '.';

let data;

describe('navigation', () => {
    before(() => {
        data = navigation();
    });
    [
        'connect_end',
        'connect_start',
        'decoded_body_size',
        'domain_lookup_end',
        'domain_lookup_start',
        'dom_complete',
        'dom_content_loaded_event_end',
        'dom_content_loaded_event_start',
        'dom_interactive',
        'encoded_body_size',
        'fetch_start',
        'load_event_end',
        'load_event_start',
        'redirect_end',
        'redirect_start',
        'request_start',
        'response_end',
        'response_start',
        'secure_connection_start',
        'transfer_size',
        'unload_event_end',
        'unload_event_start'
    ].forEach(
        (event) => it(
            `${event} == number`,
            () => {
                expect(data).to.have.property(event);
                expect(data[event]).to.be.a('number');
            }
        )
    );
    [
        'dom_loading',
        'navigation_start'
    ].forEach(
        (event) => it(
            `${event} == undefined`,
            () => {
                expect(data).to.have.property(event);
                expect(data[event]).to.be.undefined;
            }
        )
    );
});
