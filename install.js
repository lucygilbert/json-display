var Validate = require('git-validate');

Validate.installScript('lint', "jshint ./**/*.js");
Validate.installScript('test', "karma start");

Validate.configureHook('pre-commit', ['lint', 'test', 'check-coverage']);
