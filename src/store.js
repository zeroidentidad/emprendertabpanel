import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

//Conf firestore:
const firebaseConf = {
    apiKey: "AIzaSyAg_fTT6rZNdD0tW49uX7nUl58eU6suyuM",
    authDomain: "emprendertab.firebaseapp.com",
    databaseURL: "https://emprendertab.firebaseio.com",
    projectId: "emprendertab",
    storageBucket: "emprendertab.appspot.com",
    messagingSenderId: "121929370745",
    appId: "1:121929370745:web:b6694b59683a82d64b18a8"    
}

firebase.initializeApp(firebaseConf);

//Conf react-redux:
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

//Enhacer con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

//Reducers 
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

//state inicial
const initialState = {};

//Crear store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase)/*,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/
));
export default store;