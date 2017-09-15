import Vue from 'vue';
import VueD3 from 'vue-d3';
Vue.use(VueD3);

const Template = {
    name: 'Template',
    template: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta http-equiv="content-type" content="text/html;charset=utf-8">
            <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
            <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.min.css">
            <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-default/index.css">
        </head>
        <body>
            <div id="app" slot="content">
                <slot name="main">
                    <slot></slot>
                </slot>
            </div>
        </body>
    </html>`
};

Vue.component('Template', Template);
