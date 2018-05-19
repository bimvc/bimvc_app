import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import firestore from 'firebase/firestore'
import FIREBASE_CONFIG from '../api/firebase.config';
import xdLocalStorage from 'xdlocalstorage';

window.xdLocalStorage.init({ iframeUrl: 'https://bim.vc/ls/index.html' });

const firebaseApi = firebase.initializeApp(FIREBASE_CONFIG);
const firebaseDb = firebase.firestore();
firebaseDb.settings({ timestampsInSnapshots: true });
firebaseApi
    .auth()
    .onAuthStateChanged(async user => {
        if (user) {
            store.commit('auth');
            const { uid, email } = user;
            const doc = await firebaseDb.collection('users').doc(uid).get();

            store.commit('updateUserInfo', { uid, email, ...doc.data() });
            store.commit('updateUserInfoInProgress');
            store.commit('setTestsPassing', doc.data().testPassing);

            let tests = []; 
            const query = await firebaseDb.collection('tests').get();
            query.forEach(doc => tests.push(doc.data()));

            store.commit('setTestsList', tests);
        } else {
            store.commit('unAuth');
        }
    });

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        uid: null,

        isAuth: null,
        signInProcess: false,
        password: null,

        email: null,    
        emailVerified: false,
        
        name: null,
        surname: null,
        city: null,
        company: null,
        status: null,
        updateUserInfoInProgress: true,
        loadedUserInfo: null,

        displayName: null,
        registrationProcess: false,
        awaitEmailConfirm: false,

        testsList: [],
        testPassing: [],
    },
    mutations: {
        updateUserInfo (state, info) {
            state.uid = info.uid || state.uid;
            state.email = info.email || state.email;
            state.name = info.name || state.name;
            state.surname = info.surname || state.surname;
            state.city = info.city || state.city;
            state.status = info.status || state.status;
            state.company = info.company || state.company;
        },
        updateUserInfoInProgress (state) {
            state.updateUserInfoInProgress = !state.updateUserInfoInProgress;
        },
        setTestsPassing (state, data) {
            state.testPassing = data;
        },
        setTestsList (state, data){
            state.testsList = data;
        },
        signInStart (state) {
            state.signInProcess = true;
        },
        signInStop (state) {
            state.signInProcess = false;
        },
        registrationStart (state) {
            state.registrationProcess = true;
        },
        registrationStop (state) {
            state.registrationProcess = true;
        },
        auth (state) {
            state.isAuth = true;
        },
        unAuth (state) {
            state.isAuth = false;    
        },
        setAwaitEmailConfirm (state) {
            state.awaitEmailConfirm = true;
        }
    },
    actions: {
        async signIn ({ commit }, { email, password }) {
            if (!email || !password) {
                return;
            }
            
            commit('signInStart');
            try{
                const signIn = await firebaseApi.auth().signInWithEmailAndPassword(email, password);
                if (signIn){
                    window.xdLocalStorage.setItem('user', email);
                    window.xdLocalStorage.setItem('pwd', password);
                    return commit('auth');
                }
            } catch (e) {
                commit('signInStop');
                alert('Не верный пароль или email. Для восстановления нажмите "Забыли пароль?"');
            }
        },
        async registration ({ commit }, { email, password, name, surname }) {
            if (email && password && name && surname) {
                commit('registrationStart');
                try{
                    await firebaseApi.auth()
                        .createUserWithEmailAndPassword(email, password);
                    await firebaseApi.auth().currentUser
                        .sendEmailVerification();
                    await firebaseApi.auth().currentUser
                        .updateProfile({ displayName: `${name} ${surname}`});
                    const user = firebaseApi.auth().currentUser;
                    await firebaseDb.collection('users').doc(user.uid);

                    commit('setAwaitEmailConfirm');
                } catch(e) {
                    commit('registrationStop');
                    alert('Ошибка. Попробуйте еще раз.');
                }
            }
        },
        async passwordRecovery({ commit }, { email }) {
            await firebaseApi.auth().sendPasswordResetEmail(email)
        },
        async updateUserInfo ({ state, commit }, { name, surname, city, company, status }) {
            const data = {
                name,
                surname,
                city,
                company,
                status
            };

            await firebaseDb
                .collection('users')
                .doc(state.uid)
                .set(data, { merge: true })
                .then(() => commit('updateUserInfo', data))
                .catch(e => console.log(e));
        },
        async generateCerificate ({ state, commit }, { courseName, date, result }) {
            const { name, surname } = state;
            const API_URL = 'https://us-central1-bimvc-3cac4.cloudfunctions.net/';

            const certUrl = `${API_URL}/pdf?displayName=${name} ${surname}&
                    courseName=${courseName}&
                    date=${date}&
                    result=${result}`;

            window.open(certUrl, 'Сертификат', 'width=600,height=400,menubar=no');
        }
    }
});

export default store;