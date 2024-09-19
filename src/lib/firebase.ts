import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp, getApp, getApps } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getConfig } from "../config/get-config";

const firebaseConfig = {
  apiKey: getConfig().firebase.apiKey,
  authDomain: getConfig().firebase.authDomain,
  databaseURL: getConfig().firebase.databaseUrl,
  projectId: getConfig().firebase.projectId,
  storageBucket: getConfig().firebase.storageBucket,
  messagingSenderId: getConfig().firebase.messagingSenderId,
  appId: getConfig().firebase.appId,
  measurementId: getConfig().firebase.measurementId,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
