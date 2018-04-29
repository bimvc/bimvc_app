import Vue from 'vue';
import VueRouter from 'vue-router';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import store from './store/index';

import Auth from './components/auth.vue';
import Registration from './components/registration';
import Account from './components/account.vue';
import Edit from './components/account/edit';
import Testing from './components/account/testing';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/auth', component: Auth },
        { path: '/registration', component: Registration },
        {
            path: '/account',
            component: Account,
            children: [
                {
                    path: 'testing',
                    component: Testing
                },
                {
                    path: 'edit',
                    component: Edit
                }
            ]
        },
        { path: '/*', component: Account },
    ]
});

new Vue({
    el: '#app',
    router,
    store
}).$mount('#app');