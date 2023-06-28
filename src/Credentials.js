// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCH2O_kdCbV0YEvrvpNCuaHRHfjbRXMyWU",
//   authDomain: "easyfit-a2a22.firebaseapp.com",
//   projectId: "easyfit-a2a22",
//   storageBucket: "easyfit-a2a22.appspot.com",
//   messagingSenderId: "212676373212",
//   appId: "1:212676373212:web:25f2cb959a5a8ee066a219",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBlnbXAnhnu1M56Ew72DJ8IsBZ8C9RCsOE",
  authDomain: "easyfittest2.firebaseapp.com",
  projectId: "easyfittest2",
  storageBucket: "easyfittest2.appspot.com",
  messagingSenderId: "503029551757",
  appId: "1:503029551757:web:0796cfa09cc701816688c4",
};
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
