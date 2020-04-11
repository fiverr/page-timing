const { resolve } = require('path');
const EcmaPlugin = require('ecma-webpack-plugin');

const { NODE_ENV = 'production' } = process.env;

module.exports = {
    mode: NODE_ENV,
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'main.js',
        library: 'pageTiming',
        libraryTarget: 'umd2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: resolve('./src'),
                sideEffects: false,
                options: require('./.babelrc.js')
            }
        ]
    },
    plugins: [
        new EcmaPlugin({ parser: { ecmaVersion: '5' } })
    ],
    target: 'web'
};
