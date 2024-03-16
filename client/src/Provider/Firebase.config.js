import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBc05ShX_GvdY9onrtyXH3X3yogy1WRgI0",
  authDomain: "hotel-booking-cab87.firebaseapp.com",
  projectId: "hotel-booking-cab87",
  storageBucket: "hotel-booking-cab87.appspot.com",
  messagingSenderId: "196901232868",
  appId: "1:196901232868:web:68896ed186b360c6f04cf1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth