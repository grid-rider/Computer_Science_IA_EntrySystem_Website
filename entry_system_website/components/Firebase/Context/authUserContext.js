import { initializeApp, getApps } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword ,signOut, deleteUser} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, getDocs, query, collection, where, onSnapshot, updateDoc, Timestamp } from "firebase/firestore";
import { getDatabase, set, ref, push } from 'firebase/database';
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

function userDocumentModel(email, FirstName, LastName, School, Role) {

    return({
        email: email,
        entry_status: false,
        first_name: FirstName,
        last_name: LastName,
        school: School,
        role: Role,
        img_url: 'https://bit.ly/dan-abramov',
        last_entry:  Timestamp.now(),
        last_exit:  Timestamp.now(),
    })
}

function getFirebaseApp() {
    let firebaseConfig = {
        apiKey: "AIzaSyDKwY8frueK8cFoTFEvNYdcF1-IFRYDw4o",
        authDomain: "entrysystem-2fbb1.firebaseapp.com",
        projectId: "entrysystem-2fbb1",
        databaseURL: "https://entrysystem-2fbb1-default-rtdb.europe-west1.firebasedatabase.app/",
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
    const realtime_db = getDatabase(app);

    let [loading, setLoading] = useState(true);
    let [user, setUser] = useState(null);

    useEffect((() => {
        
        let unsubsribeAuth = onAuthStateChanged(auth, ((user) => {
            if(user){
                console.log("user logged In");
                console.log(user);
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
    async function Firebase_signOut () {
        try {
            signOut(auth);   
        } catch (error) {
            console.log(error);
        }
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////Firestore Functions/////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let [studentList, setStudentList] = useState([]);
    let [ userData, setUserData] = useState(null);
    let [ acessStations, setAcessStations] = useState([]);


    useEffect(() => {
        let UserDocListener;

        if(user != null){
            //set User Data
            UserDocListener = onSnapshot(doc(db,"users",user.uid),{includeMetadataChanges: true},(doc) => {
                console.log("updated local user information")
                setUserData(doc.data());
                setLoading(false);
            })
        } else {
            setUserData(null);
            if(UserDocListener != null){
                UserDocListener();
            }
        }
    }, [user]);

    useEffect(() => {
        let StudentListListener;
        let StationListener;

        if(userData != null && user != null){
            //check role & get student list (for production refractor name to list as list is not isolated to students but also other user roles)
            StudentListListener =  onSnapshot(query(collection(db, "users"), where("school","==",userData.school)), ((querySnapshot) => {
                console.log("updated user list");
                setStudentListFromSnapshot(querySnapshot);
            }));

            StationListener = onSnapshot(query(collection(db,"stations"), where("school","==",userData.school)), ((querySnapshot) => {
                console.log("updated station list");
                setStationListFromSnapshot(querySnapshot);
            }));
        }else{
            resetFirestoreState();
            if(StudentListListener != null){
                StudentListListener();
            }
            if(StationListener != null){
                StationListener();
            }
        }
    }, [userData])

    //create user record in firestore database
    function createFirestoreUser (UUID , email, password, FirstName, LastName, School, Role){
        return setDoc(doc(db,"users", UUID), userDocumentModel(email,FirstName,LastName,School, Role))
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

    function setStationListFromSnapshot(snapshot){
        let temp_StationArray = [];
        snapshot.forEach(station => {
            temp_StationArray.push(station);
        });
        console.log("stations : ");
        console.log(temp_StationArray);

        setAcessStations(temp_StationArray);
    }
    
    
    function resetFirestoreState() {
        setStudentList([]);
        setAcessStations([]);
    }

    async function getUserExtraInformation() {
        if (user) {
            try {
                let UserDoc = await getFirestoreUser(user.uid);
                if(UserDoc.exists()){
                    return UserDoc.data();
                }else{
                    throw("User Document Not Found")
                }
            } catch (error) {
               console.log(error) 
               return(error)
            }
        }

    }

    async function updateUserInformation(key,information){
        if (user) {
            try {
                await updateDoc(doc(db,"users",user.uid), {
                    [key]: information
                });
            } catch (error) {
                console.log(error);
                return(error);
            }
        }
    }

    async function updateStudentEntryStatus(status,id){

        if (user) {
            if(status) {
                try {
                    await updateDoc(doc(db,"users",id), {
                        entry_status: true 
                    });
                } catch (error) {
                    console.log(error);
                    return(error);
                }
            }
            else {
                try {
                    await updateDoc(doc(db,"users",id), {
                        entry_status: false
                    });
                } catch (error) {
                    console.log(error);
                    return(error);
                }
            }
        }
    }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////Realtime DB Functions///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async function setBuildingTransfer(type,station){
        if (user) {
            try {
                await push(ref(realtime_db,"/acess_log_v2/"), {
                    user_id: user.uid,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    timestamp: Timestamp.now(),
                    acess_type: type,
                    school: userData.school,
                    station: station, 
                })
            } catch (error) {
                console.log(error);
            }

        }
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
        studentList,
        getUserExtraInformation,
        userData,
        updateUserInformation,
        updateStudentEntryStatus,
        setBuildingTransfer,
        acessStations
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 