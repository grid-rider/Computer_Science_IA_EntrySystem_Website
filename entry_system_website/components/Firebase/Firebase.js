// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut, signInWithEmailAndPassword , createUserWithEmailAndPassword  } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//function  for signing Up users
export function Firebase_signUp(email, password) {
    createUserWithEmailAndPassword(auth, email,password).then(
        (userCredentials) => {
            const user = userCredentials.user;
            return user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            return errorMessage;
        })
}

//function  for signing in users 
export function Firebase_signIn (email, password) {
    signInWithEmailAndPassword(auth, email,password).then(
        (userCredentials) => {
            const user = userCredentials.user;
            return user;
        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message;
            return errorMessage;
        })
}



//function  for signing out users 


