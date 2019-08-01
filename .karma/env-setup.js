Object.assign(
    global,
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
