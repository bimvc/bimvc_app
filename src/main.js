import Vue from 'vue';
import VueRouter from 'vue-router';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import store from './store/index';

import Auth from './components/auth.vue';
import Account from './components/account.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/auth', component: Auth },
        { path: '/account', component: Account },
        { path: '/*', component: Account },
    ]
});

new Vue({
    el: '#app',
    router,
    store
}).$mount('#app');