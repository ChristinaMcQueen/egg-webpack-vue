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
            client: 'app/web/framework/entry/client-loader.js',
            server: 'app/web/framework/entry/server-loader.js'
        }
    },
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
                // options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
                // include: [resolve('src'), resolve('test'), resolve('document')]
            },
            {
                test: /\.md$/,
                loader: './build/vue-markdown-loader2'
            }
        ]
    },
    alias: {
        server: 'app/web/framework/entry/server.js',
        client: 'app/web/framework/entry/client.js',
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
