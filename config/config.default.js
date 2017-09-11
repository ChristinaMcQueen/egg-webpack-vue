const path = require('path');

module.exports = app => {
    const config = {};
    config.keys = app.name + '_1501732347907_7907';
    // config.middleware = ['wrap', 'crossDomain'];
    config.proxyworker = {
        port: 10086
    };
    config.logger = {
        consoleLevel: 'DEBUG',
        dir: path.join(app.baseDir, 'logs')
    };
    config.static = {
        prefix: '/public/',
        dir: path.join(app.baseDir, 'public')
    };
    config.mysql = {
        client: {
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: '',
            database: 'servicepack'
        }, // 单数据库信息配置
        app: true, // 是否加载到 app 上，默认开启
        agent: false // 是否加载到 agent 上，默认关闭
    };
    config.mongoose = {
        url: 'mongodb://127.0.0.1/zebra',
        options: {}
    };
    config.development = {
        watchDirs: [],
        ignoreDirs: [],
        fastReady: true,
        reloadOnDebug: true
    };
    config.view = {
        cache: false
    };
    config.vuessr = {
        // layout: path.join(app.baseDir, 'app/web/view/layout.html'),
        // injectRes: []
    };
    config.webpack = {
        port: 9000,
        proxy: true,
        proxyMapping: {
            js: 'text/javascript; charset=UTF-8',
            css: 'text/css; charset=UTF-8',
            json: 'application/json; charset=UTF-8',
            html: 'text/html; charset=UTF-8'
        },
        webpackConfigList: []
    };
    return config;
};
