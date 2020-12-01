const { name, version } = require('../package.json');

module.exports = {
    locals: {
        name: name.replace(/-/, ' '),
        version
    }
};
