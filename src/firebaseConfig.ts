import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlNSZ8byoHatyZou2ELCl32mmynXwburM",
  authDomain: "khadime-mbacke-thiam.firebaseapp.com",
  projectId: "khadime-mbacke-thiam",
  storageBucket: "khadime-mbacke-thiam.appspot.com",
  messagingSenderId: "1024911359558",
  appId: "1:1024911359558:web:ee65c971c05d3c2d4f9447",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialiser Firestore

export { db };
