// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API,
	authDomain: "mern-market-b4466.firebaseapp.com",
	projectId: "mern-market-b4466",
	storageBucket: "mern-market-b4466.appspot.com",
	messagingSenderId: "710821213736",
	appId: "1:710821213736:web:d3bca2da165168423b671d",
	measurementId: "G-R0RN6EHK7S",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
