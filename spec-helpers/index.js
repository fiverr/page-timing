import fixture from './fixture.json';

export const getEntriesByTypeMock = (type) => fixture.filter(
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
