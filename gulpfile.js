const gulp = require('gulp');
const sonarqubeScanner = require('sonarqube-scanner');

gulp.task('default', function(callback) {
    sonarqubeScanner({
        serverUrl: 'http://192.168.10.214:9000',
        token: '',
        options: {
            'sonar.exclusions': 'index.js,gulpfile.js,node_modules/**/*,test/**/*,coverage/**/*,mochawesome-reports',
            'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
            'sonar.javascript.lcov.reportPath': 'coverage/lcov.info'
        }
    }, callback);
});
