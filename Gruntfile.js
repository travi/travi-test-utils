module.exports = function (grunt) {
    'use strict';

    require('load-grunt-config')(grunt);

    grunt.registerTask('gates', ['jslint']);
    grunt.registerTask('default', 'gates');
};