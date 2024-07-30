// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVOpKDN7TI3ObFQiapYrVVpLd_9vMAmlA",
  authDomain: "react-quiz-32a90.firebaseapp.com",
  projectId: "react-quiz-32a90",
  storageBucket: "react-quiz-32a90.appspot.com",
  messagingSenderId: "636448735297",
  appId: "1:636448735297:web:7ec2fa58a446bc3d48c6c0",
};
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);