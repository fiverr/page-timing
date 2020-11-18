const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

Object.assign(
    global,
    chai
);

chai.use(chaiAsPromised);

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
