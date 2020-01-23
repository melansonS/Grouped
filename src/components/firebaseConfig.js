import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDmYuJpn6_8oCv0LMrciN4KxvQcTaSLhos",
  authDomain: "grouped-b4deb.firebaseapp.com",
  databaseURL: "https://grouped-b4deb.firebaseio.com",
  projectId: "grouped-b4deb",
  storageBucket: "grouped-b4deb.appspot.com",
  messagingSenderId: "805024585032",
  appId: "1:805024585032:web:f948579cae55c28faa4f7d",
  measurementId: "G-K2NFLXR1JX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
