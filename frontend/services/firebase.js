// =======================================
// Nūr Reader Platform
// Firebase Configuration
// =======================================

const firebaseConfig = {

    apiKey: "AIzaSyDlJehCOJdGYJHNJtacQNjnxtp7E0ejpUA",

    authDomain: "nur-reader-platform.firebaseapp.com",

    projectId: "nur-reader-platform",

    storageBucket: "nur-reader-platform.firebasestorage.app",

    messagingSenderId: "10695119765",

    appId: "1:10695119765:web:f8bff06857fe5233631c9c"

};

// Initialise Firebase
firebase.initializeApp(firebaseConfig);

// Firestore Database
const db = firebase.firestore();

console.log("✅ Firebase Connected");