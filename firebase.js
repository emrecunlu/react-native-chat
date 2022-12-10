import AsyncStorage from '@react-native-async-storage/async-storage';
import {initializeApp, getApps, getApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {initializeAuth, getReactNativePersistence, getAuth, onAuthStateChanged} from 'firebase/auth/react-native'
import {login, logout} from "./store/features/user";
import {store} from "./store/store";

const firebaseConfig = {
    apiKey: "AIzaSyBpLbdf9eMBbKUtwdHA1QNYF1RPGzWP4F4",
    authDomain: "react-native-chatt.firebaseapp.com",
    projectId: "react-native-chatt",
    storageBucket: "react-native-chatt.appspot.com",
    messagingSenderId: "363723184855",
    appId: "1:363723184855:web:37e916f713b49d47a02e92"
};

let app;
let auth;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig)
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    })
} else {
    app = getApp();
    auth = getAuth();
}

const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        store.dispatch(login(JSON.stringify(user)));
    } else {
        store.dispatch(logout());
    }
});

export {auth, db}
