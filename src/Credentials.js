// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
