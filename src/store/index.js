import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import firestore from 'firebase/firestore'
import FIREBASE_CONFIG from '../api/firebase.config';

const firebaseApi = firebase.initializeApp(FIREBASE_CONFIG);
const firebaseDb = firebase.firestore();

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
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
        testsPassing: []
    },
    mutations: {
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
        async registration ({ email, password, name, surname, commit }) {
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
        async loadTestInfo ({ tests, testsPassing }) {
            const query = await firebaseDb.collection("tests").get();
            query.forEach(doc => tests.push(doc.data()));

            const user = await firebaseDb.collection("users").doc(this.uid).get();
            if (user.exists) {
                const data = user.data();
                if (data.hasOwnProperty('testPassing')) {
                    testsPassing = user.data().testPassing;
                }
            }

            tests.forEach((t, index) => {
                t.blocks.forEach((b, index) => {
                    b.result = testPassing
                        .filter(p => p.testid === +b.id)
                        .sort((p1, p2) => p1.sessionid < p2.sessionid);

                    if (b.result[0] && b.result[0].hasOwnProperty('result_num')) {
                        b.result = +b.result.toFixed(2);
                    }
                });

                t.blockResult = 0;
                t.blocks.forEach(b => t.blockResult += b.result);
                t.blockResult = t.blockResult % t.blocks.length;

                console.log(t);
            });

        }
    }
});

export default store;