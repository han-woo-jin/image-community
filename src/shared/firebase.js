import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDwS-kujU17hSBe8Twn-WIXKubkZjStavU",
  authDomain: "image-community-6d27b.firebaseapp.com",
  projectId: "image-community-6d27b",
  storageBucket: "image-community-6d27b.appspot.com",
  messagingSenderId: "664749355967",
  appId: "1:664749355967:web:9c04ed2a08087d3a10670a",
  measurementId: "G-YZB27LM0PW"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const storage = firebase.storage();
const realtime = firebase.database();
export { auth, apiKey, firestore, storage, realtime };