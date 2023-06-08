import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  // Add your Firebase configuration here
  apiKey: "AIzaSyBV4ZB-UR_cXOhz3BV0YL6hcjiH3NAANVk",
  authDomain: "file-uploader-3bcd8.firebaseapp.com",
  projectId: "file-uploader-3bcd8",
  storageBucket: "file-uploader-3bcd8.appspot.com",
  messagingSenderId: "594488211887",
  appId: "1:594488211887:web:e1d82497ed7a5c5e24975a",
  measurementId: "G-Y0VDEY1TES"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export the Firebase storage service
export const storage = firebase.storage();


