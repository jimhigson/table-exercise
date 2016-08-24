'use strict';

module.exports = function( karma ) {
    karma.set({

        frameworks: [ 'jasmine' ],

        files: [
            'angular.min.js',
            'angular-mocks.js',
            'specs/*.spec.js',
            '*.js'
        ],

        reporters: [ 'dots' ],

        logLevel: 'WARN',

        singleRun: false,
        autoWatch: true
    });
};
