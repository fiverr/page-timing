const sleep = (num = 0) => new Promise((resolve) => setTimeout(resolve, Math.min(num, 1500)));

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
    {sleep, onload},
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
