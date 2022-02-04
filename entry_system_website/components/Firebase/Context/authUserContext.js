import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword ,signOut, deleteUser} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

function userDocumentModel(email, FirstName, LastName, School) {
    return({
        email: email,
        entry_status: false,
        first_name: FirstName,
        last_name: LastName,
        school: School,

    })
}

function getFirebaseApp() {
    const firebaseConfig = {
        apiKey: "AIzaSyDKwY8frueK8cFoTFEvNYdcF1-IFRYDw4o",
        authDomain: "entrysystem-2fbb1.firebaseapp.com",
        projectId: "entrysystem-2fbb1",
        storageBucket: "entrysystem-2fbb1.appspot.com",
        messagingSenderId: "986017227132",
        appId: "1:986017227132:web:d8aa9215d01334e9df04f9",
        measurementId: "G-Z7ZZ2GQM0T"
    };

    return initializeApp(firebaseConfig);
}

export function AuthProvider({ children }) {

    const app = getFirebaseApp();
    const auth = getAuth(app);
    const db = getFirestore(app);

    let [loading, setLoading] = useState(true);
    let [user, setUser] = useState(null);

    useEffect((() => {
        let unsubsribeAuth = onAuthStateChanged(auth, ((user) => {
            if(user){
                console.log("user logged In");
                setLoading(true);
                setUser(user);
            }else{
                console.log("user logged Out");
                resetAuthState()
            }
        }));
    }),[]);

    //function  for signing in users 
    function signIn (email, password) {
        return signInWithEmailAndPassword(auth, email,password);
    }

    //function  for signing out users 
    function Firebase_signOut () {
        signOut(auth);   
    }

    //function  for signing in users 
    function createAccount (email, password) {
        return createUserWithEmailAndPassword(auth, email,password);
    }

    function createFirestoreUser (UUID , email, password, FirstName, LastName, School){
        return setDoc(doc(db,"users", UUID), userDocumentModel(email,FirstName,LastName,School))
    }

    //function for deleting user 
    //note requires authentication
    function deleteAccount() {
        return deleteUser(user);
    }

    function resetAuthState() {
        setUser(null);
        setLoading(true);
    }

    

    let value = {
        loading,
        user,
        signIn,
        Firebase_signOut,
        createAccount,
        createFirestoreUser,
        deleteAccount,
        resetAuthState
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 