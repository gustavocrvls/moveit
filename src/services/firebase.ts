import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  authDomain: 'https://move-it-88dee.firebaseapp.com',
  projectId: "move-it-88dee",
};

if (!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);
else
  firebase.app();


export const db = firebase.firestore();
