module.exports = function(config) {
  var configuration = {
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'test/*.spec.js',
      'json-display.js',
    ],
    preprocessors: {
      'json-display.js': ['coverage'],
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      check: {
        global: {
          statements: 95,
          branches: 90,
          functions: 100,
          lines: 95,
        },
      },
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
}
