const wait = require('@lets/wait');
const sleep = require('@lets/sleep');

const onload = () => new Promise((resolve) => {
    isReady() || (document.onreadystatechange = isReady);

    function isReady() {
        if (document.readyState === 'complete') {
            resolve();
            return true;
        };
        return false;
    }
});


Object.assign(
    global,
    {sleep, wait, onload},
    require('chai')
);

/**
 * empty the document element
 * @return {HTMLDocument}
 */
document.empty = () => {
    let i = document.body.children.length;

    while (i--) {
        const child = document.body.children[i];

        (child instanceof HTMLScriptElement) || document.body.removeChild(child);
    }

    return document;
};
