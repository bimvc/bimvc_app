import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isAuth: false,
    },
    mutations: {
        auth (state) {
            state.isAuth = true;
        }
    }
});

export default store;