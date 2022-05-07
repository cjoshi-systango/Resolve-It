import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, set, ref ,get,child ,onValue} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { getStorage,ref as sref,uploadBytesResumable,getDownloadURL} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBln9BalbYLSLzX6KFth-buEF7X_JiHesM",
  authDomain: "support-management-6e9d1.firebaseapp.com",
  databaseURL: "https://support-management-6e9d1-default-rtdb.firebaseio.com",
  projectId: "support-management-6e9d1",
  storageBucket: "support-management-6e9d1.appspot.com",
  messagingSenderId: "1071450076172",
  appId: "1:1071450076172:web:1690830979efa1473c2a29",
  measurementId: "G-ZWEQD7862B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);

export { onValue , db, set, ref, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged ,get,child,getStorage,sref,uploadBytesResumable,getDownloadURL};
