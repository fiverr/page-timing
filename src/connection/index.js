import { number } from '../number/index.js';

/**
 * Optional values of legacy navigation types
 * 0: TYPE_NAVIGATE
 * 1: TYPE_RELOAD
 * 2: TYPE_BACK_FORWARD
 * 255: TYPE_RESERVED
 */
const LEGACY_NAVIGATION_TYPES = [
    'navigate',
    'reload',
    'back_forward'
];

/**
 * @see [NetworkInformation](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)
 * @returns {object}
 */
export function connection() {
    const { connection } = window.navigator || {};
    const result = {};

    try {
        const [
            navigation = performance.navigation
        ] = performance.getEntriesByType('navigation');

        result.navigation_type = typeof navigation.type === 'number'
            ? LEGACY_NAVIGATION_TYPES[navigation.type]
            : navigation.type
        ;
    } catch (error) {
        // ignore
    }

    if (connection) {
        Object.assign(
            result,
            {
                connection_type: connection.type, // bluetooth, cellular, ethernet, none, wifi, wimax, other, unknown
                effective_bandwidth: number(connection.downlink), // MBsS
                effective_connection_type: connection.effectiveType, // slow-2g, 2g, 3g, 4g
                effective_max_bandwidth: number(connection.downlinkMax), // MBsS
                reduced_data_usage: connection.saveData, // boolean
                round_trip_time: number(connection.rtt)
            }
        );
    }

    return result;
}
