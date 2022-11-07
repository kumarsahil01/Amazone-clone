// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0o5OStdT9eAlTXyPZ9j99aa8zr17f_g0",
  authDomain: "e-clone-dd561.firebaseapp.com",
  projectId: "e-clone-dd561",
  storageBucket: "e-clone-dd561.appspot.com",
  messagingSenderId: "6165912463",
  appId: "1:6165912463:web:5f23b9d31c54851c3749fa",
  measurementId: "G-R3Z5T45HXQ"
};

// Initialize Firebase
// const db =initializeApp.firestore();
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
export{auth,db };
export default app;