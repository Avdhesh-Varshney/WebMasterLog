import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};
// const firebaseConfig = {
//     apiKey: process.env.VITE_API_KEY,
//     authDomain: process.env.VITE_AUTH_DOMAIN,
//     projectId: process.env.VITE_PROJECT_ID,
//     storageBucket: process.env.VITE_STORAGE_BUCKET,
//     messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
//     appId: process.env.VITE_APP_ID,
//     measurementId: process.env.VITE_MEASUREMENT_ID
// };

const firebaseApp = firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
const auth = getAuth(firebaseApp);
const db = firebaseApp.firestore();

export {auth, db};