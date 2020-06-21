import { connection } from '.';

describe('connection', () => {
    it('should expose supported metrics', () => {
        const {
            connection_type,
            effective_bandwidth,
            effective_connection_type,
            effective_max_bandwidth,
            reduced_data_usage,
            round_trip_time
        } = connection();

        expect(connection_type).to.be.undefined; // Not yet exposed by Chrome
        expect(effective_bandwidth).to.be.a('number');
        expect(effective_connection_type).to.be.a('string');
        expect(effective_max_bandwidth).to.be.undefined; // Not yet exposed by Chrome
        expect(reduced_data_usage).to.be.false;
        expect(round_trip_time).to.be.a('number');
    });
});
