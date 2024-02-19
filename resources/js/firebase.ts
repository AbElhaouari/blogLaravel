// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNLEY49R-1atSO2uiU1GpP4xsLbEtSKYY",
    authDomain: "laravelblog-63e62.firebaseapp.com",
    projectId: "laravelblog-63e62",
    storageBucket: "laravelblog-63e62.appspot.com",
    messagingSenderId: "1095317013147",
    appId: "1:1095317013147:web:f662518010bc0bfdca7c3e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
