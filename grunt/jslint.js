module.exports = {
    utils: {
        src: [
            'tools/**/*.js'
        ],
        directives: {
            browser: true,
            predef: [
                '$',
                'jQuery',
                'sinon',
                'assertEquals',
                'assertObject',
                'assertFunction',
                'travi'
            ]
        },
        options: {
            errorsOnly: true,
            checkstyle: 'logs/jslint-utils.xml'
        }
    },
    config: {
        src: [
            'Gruntfile.js',
            'grunt/*.js'
        ],
        directives: {
            node: true
        },
        options: {
            errorsOnly: true,
            checkstyle: 'logs/jslint-config.xml'
        }
    }
};