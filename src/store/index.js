import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import firestore from 'firebase/firestore'
import FIREBASE_CONFIG from '../api/firebase.config';

const firebaseApi = firebase.initializeApp(FIREBASE_CONFIG);
const firebaseDb = firebase.firestore();

firebaseApi.auth().onAuthStateChanged(user => {
    if (user) {
        const { uid } = user;
        store.commit('setUserInfo', { uid });
    }
});

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        uid: null,
        signInProcess: false,
        isAuth: false,
        emailVerified: false,
        email: null,
        password: null,
        name: null,
        surname: null,
        city: null,
        company: null,
        displayName: null,
        tests: [],
        testPassing: []
    },
    mutations: {
        setUserInfo (state, info) {
            state.uid = info.uid;
        },
        setTestsPassing (state, data) {
            state.testPassing = data;
        },
        setTests (state, data){
            state.tests = data;
        },
        signInStart (state) {
            state.signInProcess = true;
        },
        auth (state) {
            state.isAuth = true;
        }
    },
    actions: {
        async signIn ({ commit }, { email, password }) {
            if (!email || !password) {
                return;
            }
            
            commit('signInStart');

            const signIn = await firebaseApi.auth().signInWithEmailAndPassword(email, password);
            if (signIn){
                commit('auth');
            }
        },
        async registration ({ email, password, name, surname }) {
            try{
                await firebaseApi.auth()
                    .createUserWithEmailAndPassword(email, password);
                await firebaseApi.auth().currentUser
                    .sendEmailVerification();
                await firebaseApi.auth().currentUser
                    .updateProfile({ displayName: name + ' ' + surname});
                const user = firebaseApi.auth().currentUser;
                await firebaseDb.collection('users').doc(user.uid);
            } catch(e) {
                console.log(e);
            }
        },
        async loadTestInfo ({ state, commit }) {
            const { uid } = state;
            if (!uid) {
                return;
            }
            let tests = [];
            const query = await firebaseDb.collection('tests').get();
            query.forEach(doc => tests.push(doc.data()));

            const user = await firebaseDb.collection('users').doc(uid).get();
            let testPassing = null;
            if (user.exists) {
                const data = user.data();
                if (data.hasOwnProperty('testPassing')) {
                    testPassing = data.testPassing;
                }
            }

            tests.forEach((t) => {
                t.blocks.forEach((b) => {
                    b.result = testPassing
                        .filter(p => p.testid === +b.id)
                        .sort((p1, p2) => p1.sessionid < p2.sessionid);

                    b.result = b.result[0].ResultStr;
                });

                t.blockResult = 0;
                t.blocks.forEach(b => t.blockResult += b.result);
                t.blockResult = t.blockResult % t.blocks.length;
            });

            commit('setTests', tests[0]);
        }
    }
});

export default store;