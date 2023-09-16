// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDBvQTZVa4fgTe2vmSp-BdJo1FK_NRq6Hc",
  authDomain: "fir-611ee.firebaseapp.com",
  projectId: "fir-611ee",
  storageBucket: "fir-611ee.appspot.com",
  messagingSenderId: "1089531468721",
  appId: "1:1089531468721:web:b8ba0cc20dee45403cfb90",
  measurementId: "G-TY7HNPEPJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth();

export {app,auth};
