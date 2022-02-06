import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword ,signOut, deleteUser} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, getDocs, query, collection, where, onSnapshot } from "firebase/firestore";
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


    //function for deleting user 
    //note requires authentication
    function deleteAccount() {
        return deleteUser(user);
    }

    function resetAuthState() {
        setUser(null);
        setLoading(true);
    }


    //////////////////Firestore Functions////////////////////////
    let [studentList, setStudentList] = useState([]);

    useEffect(() => {
        let unsubscribe;

        async function getUserSchool() {
            let school;
            try {
                const userDocument = await getFirestoreUser(user.uid);
                school = userDocument.data().school;
            } catch (error) {
                console.log("error occuered with student school fetching");
                console.log(error);
                return null;
            }
            return school;
        }

        if(user != null){
            getUserSchool().then((school) => {
                console.log(school);
                unsubscribe =  onSnapshot(query(collection(db, "users"), where("school","==",school)), ((querySnapshot) => {
                    console.log("updated user list");
                    setStudentListFromSnapshot(querySnapshot);
                }));
            })

        }else{
            resetFirestoreState();
            if(unsubscribe != null){
                unsubscribe();
            }
        }
    }, [user]);

    useEffect(() => {
        console.log("change detected in student movement");
    }, [studentList])


    //create user record in firestore database
    function createFirestoreUser (UUID , email, password, FirstName, LastName, School){
        return setDoc(doc(db,"users", UUID), userDocumentModel(email,FirstName,LastName,School))
    }

    //get firestore user with specific UUID 
    function getFirestoreUser(UUID) {
        return getDoc(doc(db, "users", UUID))
    }

    //get a collection of firestore user documents. Restricted to school of user.
    function getFirestoreUserGroup(school) {
        return getDocs(query(collection(db, "users"), where("school","==", school)))
    }

    function setStudentListFromSnapshot(snapshot){
        let temp_UserArray = [];
        snapshot.forEach(userRecord => {
            temp_UserArray.push(userRecord);
        });
        setStudentList(temp_UserArray);
    }
    
    function resetFirestoreState() {
        setStudentList([]);
    }

    
    ////////////////////////////////////////////////////////////

    let value = {
        loading,
        user,
        signIn,
        Firebase_signOut,
        createAccount,
        createFirestoreUser,
        deleteAccount,
        resetAuthState,
        getFirestoreUser,
        getFirestoreUserGroup,
        studentList
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 