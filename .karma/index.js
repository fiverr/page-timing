const {resolve} = require('path');
const browsers = ['Chrome'];
const watch = process.env.npm_config_watch;
const ENV_SETUP = resolve(`${__dirname}/env-setup.js`);
const browserNoActivityTimeout = 1 * 60 * 1000;
const pattern = ((args) =>
    `../src/${args.length ? `**/+(${args.join('|')})` : '**'}/spec.js`
)(JSON.parse(process.env.npm_config_argv).remain);

module.exports = (config) => {
    const {LOG_INFO} = config;

    config.set(
        {
            logLevel: LOG_INFO,
            singleRun: !watch,
            autoWatch: watch,
            basePath: '',
            frameworks: ['mocha', 'webpack'],
            browsers,
            browserNoActivityTimeout,
            port: 9876, // This is the default. Change it if you have ports collisions
            hooks : [
                'karma-webpack',
                'karma-chrome-launcher',
                'karma-mocha',
                'karma-mocha-reporter',
            ],
            reporters: ['mocha'],
            mochaReporter: { showDiff: true },
            webpackServer: {
                noInfo: true,
                stats: 'errors-only',
            },
            webpack: {},
            files: [
                ENV_SETUP,
                { pattern, watch },
            ],
            preprocessors: {
                [pattern]: ['webpack'],
                [ENV_SETUP]: ['webpack'],
            },
        }
    );
};
