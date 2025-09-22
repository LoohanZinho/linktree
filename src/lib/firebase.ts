// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-7900944804-69342",
  "appId": "1:29138376636:web:dec14f2b402d3dc1103db9",
  "apiKey": "AIzaSyCGg2t9A6d7LO7oxZXLQye9qzqF4HZNWTc",
  "authDomain": "studio-7900944804-69342.firebaseapp.com",
  "storageBucket": "studio-7900944804-69342.appspot.com",
  "messagingSenderId": "29138376636"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
