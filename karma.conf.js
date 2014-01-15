module.exports = function (config) {
    config.set({
            frameworks:['jasmine'],
            basePath: '',
            files: [
                'app/bower_components/angular/angular.js',
                'app/bower_components/angular-*/*.min.js',
                'app/bower_components/angular-mocks/angular-mocks.js',
                'app/bower_components/timecop/timecop-*.js',
                'app/bower_components/underscore/underscore-min.js',
                'app/bower_components/underscore.string/dist/underscore.string.min.js',
                'app/scripts/*.js',
                'app/scripts/**/*.js',
                'test/spec/**/*.js',
                'app/bower_components/moment/moment.js'
            ],
            reporters: ['dots'],
            port: 8080,
            runnerPort: 9100,
            colors: true,
            autoWatch: false,
//            browsers: ['Chrome'],
            captureTimeout: 5000,
            singleRun: false
        }
    );
};