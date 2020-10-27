import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore'

// var admin = require("firebase-admin");

// var serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://clone-6a708.firebaseio.com"
// });

const firebaseConfig = {
    apiKey: "AIzaSyDMwH1bhJruAC83nM1rDxzxVgKD9M4qMYA",
    authDomain: "clone-6a708.firebaseapp.com",
    databaseURL: "https://clone-6a708.firebaseio.com",
    projectId: "clone-6a708",
    storageBucket: "clone-6a708.appspot.com",
    messagingSenderId: "1030779656781",
    appId: "1:1030779656781:web:1798e181e06218001c1a04",
    measurementId: "G-MRL7ZQ7NZT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export { db, auth,firebase };