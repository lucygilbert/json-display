try {
    var Validate = require('git-validate');
} catch (e) {
    console.log('Skipping install.js. (This is only needed when working on this package.)');
    process.exit(0);
}
Validate.installScript('lint', "jshint ./**/*.js");
Validate.installScript('test', "karma start");

Validate.configureHook('pre-commit', ['lint', 'test']);

