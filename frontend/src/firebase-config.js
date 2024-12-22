// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnWuXiJ5w-PolD72sz9W8czHBZ1HkVOzs",
  authDomain: "abster-s-gallery-6b6da.firebaseapp.com",
  projectId: "abster-s-gallery-6b6da",
  storageBucket: "abster-s-gallery-6b6da.firebasestorage.app",
  messagingSenderId: "42704672729",
  appId: "1:42704672729:web:6b478c13443daa0864ebc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {storage}