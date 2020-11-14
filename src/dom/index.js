import { number } from '../number/index.js';

/**
 * getMaxNestLevel: Determine the largest DOM depth in the document or under a base element
 * @param {number} [depth=2] Used for recursion
 * @returns {number}
 */
function getMaxNestLevel(depth = 1) {
    return document.querySelector(`${'*>'.repeat(depth)}*`)
        ? getMaxNestLevel(depth + 1)
        : depth;
}

/**
 * Get stats on a DOM tree safely
 * @returns {object}
 */
export function dom() {
    try {
        return {
            final_dom_node_count: number(document.querySelectorAll('*').length),
            final_dom_nest_depth: number(getMaxNestLevel()),
            final_html_size: number(document.querySelector('html').outerHTML.length)
        };
    } catch (error) {
        return {
            final_dom_node_count: undefined,
            final_dom_nest_depth: undefined,
            final_html_size: undefined
        };
    }
}
