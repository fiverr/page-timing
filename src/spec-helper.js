exports.onload = () => new Promise((resolve) => {
    isReady() || (document.onreadystatechange = isReady);

    function isReady() {
        if (document.readyState === 'complete') {
            resolve();
            return true;
        }
        return false;
    }
});
