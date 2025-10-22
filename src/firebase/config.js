// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSWTK9sKRO5RxH6Xwx-3ebDEe6lKpo5I4",
  authDomain: "corded-academy-391318.firebaseapp.com",
  projectId: "corded-academy-391318",
  storageBucket: "corded-academy-391318.appspot.com",
  messagingSenderId: "765211039421",
  appId: "1:765211039421:web:0e0593217544b5553649d4",
  measurementId: "G-8T48B2HYXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, storage, db, auth };
