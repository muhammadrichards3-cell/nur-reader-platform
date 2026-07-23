// ======================================
// Nūr Reader Platform
// Firebase Service
// Version 0.3.0
// ======================================

// Firebase Configuration
const firebaseConfig = {

    apiKey: "AIzaSyDlJehCOJdGYJHNJtacQNjnxtp7E0ejpUA",

    authDomain: "nur-reader-platform.firebaseapp.com",

    projectId: "nur-reader-platform",

    storageBucket: "nur-reader-platform.firebasestorage.app",

    messagingSenderId: "10695119765",

    appId: "1:10695119765:web:f8bff06857fe5233631c9c"

};

let db = null;

try {

    firebase.initializeApp(firebaseConfig);

    db = firebase.firestore();

    console.log("✅ Firebase Connected");

}

catch (error) {

    console.error("❌ Firebase failed to initialise.");

    console.error(error);

}