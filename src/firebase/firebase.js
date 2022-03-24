import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBABSvy6tKA2QK4q6H7HxbuLIGHGFJC2iM",
  authDomain: "canteen-token-system.firebaseapp.com",
  projectId: "canteen-token-system",
  storageBucket: "canteen-token-system.appspot.com",
  messagingSenderId: "1076575577836",
  appId: "1:1076575577836:web:2158754d2f3b270a45e7c9",
  measurementId: "G-VG32JGJ0EN",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
export default app;