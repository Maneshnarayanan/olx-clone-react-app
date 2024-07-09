// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATxLj2UwC9hJw4xZnSqJ3pRSeZSi_nf4w",
    authDomain: "fir-994de.firebaseapp.com",
    projectId: "fir-994de",
    storageBucket: "fir-994de.appspot.com",
    messagingSenderId: "103286716332",
    appId: "1:103286716332:web:f11bce5d6d5b0576b46c09",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
