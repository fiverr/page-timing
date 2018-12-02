const {resolve} = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'main.js',
        library: 'MyLibrary',
        libraryTarget: 'umd2',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: resolve('../src'),
                sideEffects: false,
            },
        ],
    },
    target: 'web',
};
