import { number } from '../number';

/**
 * @see [NetworkInformation](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)
 * @returns {object}
 */
export function connection() {
    const { connection } = window.navigator || {};
    if (!connection) {
        return {};
    }

    return {
        connection_type: connection.type, // bluetooth, cellular, ethernet, none, wifi, wimax, other, unknown
        effective_bandwidth: number(connection.downlink), // MBsS
        effective_connection_type: connection.effectiveType, // slow-2g, 2g, 3g, 4g
        effective_max_bandwidth: number(connection.downlinkMax), // MBsS
        reduced_data_usage: connection.saveData, // boolean
        round_trip_time: number(connection.rtt)
    };
}
