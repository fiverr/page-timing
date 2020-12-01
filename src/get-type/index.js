/**
 * @type {RegExp}
 */
const extensionPattern = /\.(\w{2,5})(?:$|\?.*)/;

/**
 * @type {string}
 */
const IMAGES = 'images';

/**
 * @type {string}
 */
const JAVASCRIPT = 'javascript';

/**
 * @type {string}
 */
const STYLESHEETS = 'stylesheets';

/**
 * @type {string}
 */
const OTHER = 'other';

/**
 * @type {RegExp}
 */
const typePatterns = [
    { type: IMAGES, pattern: /jpe?g|gif|png|webm/i },
    { type: JAVASCRIPT, pattern: /[m|c]?js/i },
    { type: STYLESHEETS, pattern: /css/i }
];

/**
 * @param {string}
 * @param {RegExp}
 * @param {any}
 * @returns {object}
 */
function get(source, pattern, fallback = '') {
    const match = source.match(pattern);

    return match && match.pop() || fallback;
}

/**
 * @type {object}
 * @property {string} img
 * @property {string} script
 */
const initiators = {
    img: IMAGES,
    image: IMAGES,
    script: JAVASCRIPT
};

/**
 * @param {string} o.initiatorType
 * @param {string} o.name
 * @returns {string} (images, javascript, stylesheets, other)
 */
export async function getType({ initiatorType, name }) {
    if (Object.hasOwnProperty.call(initiators, initiatorType)) {
        return initiators[initiatorType];
    }
    const extension = get(name, extensionPattern);
    const { type } = typePatterns.find(
        ({ pattern }) => get(extension, pattern)
    ) || { type: OTHER };

    return type;
}
