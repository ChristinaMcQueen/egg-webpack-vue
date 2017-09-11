const path = require('path');

module.exports = {
    egg: true,
    framework: 'vue',
    commonsChunk: ['vendor'],
    entry: {
        include: 'app/web/page',
        exclude: ['app/web/page/[a-z]+/component', 'app/web/page/test', 'app/web/page/html', 'app/web/page/app'],
        extMatch: '.vue',
        loader: {
            client: 'app/web/framework/vue/entry/client-loader.js',
            server: 'app/web/framework/vue/entry/server-loader.js'
        }
    },
    // entry: path.join(__dirname, 'app/web/page/app/main.js'),
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    alias: {
        server: 'app/web/framework/vue/entry/server.js',
        client: 'app/web/framework/vue/entry/client.js',
        app: 'app/web/framework/vue/app.js',
        asset: 'app/web/asset',
        component: 'app/web/component',
        framework: 'app/web/framework',
        store: 'app/web/store',
        page: 'app/web/page'
    }
    // ,
    // create() {
    //     if (this.type === 'client') {
    //         this.addEntry('vendor', ['vue', 'axios']);
    //     }
    //     // 不使用loader模板, 自定义入口
    //     this.addEntry('app/main', [path.join(this.config.baseDir, 'app/web/page/app/main.js')]);
    // }
};
