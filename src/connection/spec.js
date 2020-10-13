import { connection } from './index.js';

const { getEntriesByType } = window.performance;

describe('connection', () => {
    afterEach(() => {
        window.performance.getEntriesByType = getEntriesByType;
    });
    it('should find navigation timing', () => {
        const { navigation_type } = connection();

        expect(navigation_type).to.equal('navigate');
    });
    it('should find navigation on legacy object', () => {
        window.performance.getEntriesByType = () => [];
        expect(performance.getEntriesByType('navigation')).to.have.lengthOf(0);
        const { navigation_type } = connection();

        expect(navigation_type).to.equal('navigate');
    });

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
