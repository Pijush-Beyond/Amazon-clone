import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore'

// var admin = require("firebase-admin");

// var serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://clone-6a708.firebaseio.com"
// });



const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export { db, auth,firebase };