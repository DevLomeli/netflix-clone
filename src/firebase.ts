import firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE,
    authDomain: "netflix-clone-d3c26.firebaseapp.com",
    projectId: "netflix-clone-d3c26",
    storageBucket: "netflix-clone-d3c26.appspot.com",
    messagingSenderId: "445647138406",
    appId: "1:445647138406:web:f8548ba848e31cdfd347a7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { auth }
export default db;