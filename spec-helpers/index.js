export const getEntriesByTypeMock = (type) => require('./fixture.json').filter(
    ({ entryType }) => entryType === type
);

export const onload = () => new Promise((resolve) => {
    isReady() || (document.onreadystatechange = isReady);

    function isReady() {
        if (document.readyState === 'complete') {
            resolve();
            return true;
        }
        return false;
    }
});

export const purge = () => Object.keys(require.cache).forEach(
    (key) => {
        delete require.cache[key];
    }
);
