import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import * as firestore from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const signInGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

export const signOutGoogle = () => {
  const getAuth = auth.getAuth();
  auth
    .signOut(getAuth)
    .then(() => {})
    .catch((error) => {
      console.log("sign out failed");
      console.log(error);
    });
};

export { firestore };
export const dbService = firestore.getFirestore();
