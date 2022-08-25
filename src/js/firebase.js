import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpCsLb_JOaI7vj2Asfj_tH3yTS-BbWweg",
  authDomain: "notetaker-32363.firebaseapp.com",
  projectId: "notetaker-32363",
  storageBucket: "notetaker-32363.appspot.com",
  messagingSenderId: "976624359608",
  appId: "1:976624359608:web:17d51dcb793db38f48fc4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {
    db,
    auth
}