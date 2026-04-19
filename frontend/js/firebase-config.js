// Import Firebase SDKs using Compat libraries (Global Scope) for file:// protocol support
import "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js";
import "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js";
import "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js";
import "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage-compat.js";

// Web App Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwx6w7Zh5OzifTky3mArGHFuE24-yBMmY",
    authDomain: "final-project-e9ea9.firebaseapp.com",
    projectId: "final-project-e9ea9",
    storageBucket: "final-project-e9ea9.firebasestorage.app",
    messagingSenderId: "518432933189",
    appId: "1:518432933189:web:26cd42f5523f9aa06a2a2c",
    measurementId: "G-RTEJHYVCPE"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Attach to window for other scripts to use
window.firebaseApp = app;
window.auth = auth;
window.db = db;
window.storage = storage;

console.log("Firebase Initialized Global");
