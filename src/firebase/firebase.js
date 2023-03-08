import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import 'firebase/compat/auth';
// ... other firebase imports

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyDrfrSVYeXcu0D1OqREM9bH_MiM8in6DMs",
    authDomain: "travel-budget-9f430.firebaseapp.com",
    projectId: "travel-budget-9f430",
    storageBucket: "travel-budget-9f430.appspot.com",
    messagingSenderId: "110078497532",
    appId: "1:110078497532:web:744ad7ce13dd4f73353d79",
    measurementId: "G-15QGEG090B"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export default db;