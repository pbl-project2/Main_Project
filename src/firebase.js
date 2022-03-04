import firebase from "firebase";

import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBWo8L4vvaEhpcsO1m6oQmXz4uGYAdDVe0",

  authDomain: "pbl-project2.firebaseapp.com",

  projectId: "pbl-project2",

  storageBucket: "pbl-project2.appspot.com",

  messagingSenderId: "1096574545704",

  appId: "1:1096574545704:web:56062ba485be14f40dea1d",
};

const app = firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export const auth = firebase.auth();
