import Vue from 'vue';
import Router from 'vue-router';
import Index from 'conmmon/views/index';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            alias: '/',
            component: Index
        }
    ]
});
