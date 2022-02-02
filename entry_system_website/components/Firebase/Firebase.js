// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut, signInWithEmailAndPassword , createUserWithEmailAndPassword  } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKwY8frueK8cFoTFEvNYdcF1-IFRYDw4o",
    authDomain: "entrysystem-2fbb1.firebaseapp.com",
    projectId: "entrysystem-2fbb1",
    storageBucket: "entrysystem-2fbb1.appspot.com",
    messagingSenderId: "986017227132",
    appId: "1:986017227132:web:d8aa9215d01334e9df04f9",
    measurementId: "G-Z7ZZ2GQM0T"
};

// Initialize Firebases
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//function  for signing Up users
export async function Firebase_signUp(email, password) {
    let FireBaseResponse;

    await createUserWithEmailAndPassword(auth, email,password).then(
        (userCredentials) => {
            FireBaseResponse = userCredentials.user;
        }).catch((error) => {
            //checking for error response 
            const errorCode = error.code
            const errorMessage = error.message;
            FireBaseResponse = errorCode;
        })

    return FireBaseResponse;
}

//function  for signing in users 
export async function Firebase_signIn (email, password) {
    let FireBaseResponse;

    await signInWithEmailAndPassword(auth, email,password).then(
        (userCredentials) => {
            FireBaseResponse = userCredentials.user;
        }).catch((error) => {
            //checking for error response 
            const errorCode = error.code
            const errorMessage = error.message;
            FireBaseResponse = errorCode;
        })

    return FireBaseResponse;
}



//function  for signing out users 


