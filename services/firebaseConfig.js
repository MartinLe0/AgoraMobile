import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: REMPLACER CES VALEURS PAR CELLES DE VOTRE CONSOLE FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyABEpkOXsXMVkiDWN5TcJiVQprclv8oX-w",
    authDomain: "agoramobile-6a763.firebaseapp.com",
    projectId: "agoramobile-6a763",
    storageBucket: "agoramobile-6a763.firebasestorage.app",
    messagingSenderId: "75348943328",
    appId: "1:75348943328:web:63ac9a2a065d775cb48b85",
    measurementId: "G-Q1CR81NNX0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
