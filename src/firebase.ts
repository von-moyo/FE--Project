// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-2AB4KDKjexv1yVhJnK9JfkpDsrhfQqU",
  authDomain: "lendsqr-fe-test-5614d.firebaseapp.com",
  projectId: "lendsqr-fe-test-5614d",
  storageBucket: "lendsqr-fe-test-5614d.appspot.com",
  messagingSenderId: "5625538722",
  appId: "1:5625538722:web:5c753e886098f31def8ffb",
  measurementId: "G-EBT9JGXJQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);