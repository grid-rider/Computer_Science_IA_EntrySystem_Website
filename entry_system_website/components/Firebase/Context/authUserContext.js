import { initializeApp, getApps } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword ,signOut, deleteUser} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, getDocs, query, collection, where, onSnapshot, updateDoc, Timestamp, addDoc, deleteDoc } from "firebase/firestore";
import { getDatabase, set, ref, push, onValue } from 'firebase/database';
import { createContext, useContext, useEffect, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { getStorage, uploadBytes, ref as sRef, deleteObject, getDownloadURL } from "firebase/storage";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
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

    function userDocumentModel(email, FirstName, LastName, School, Role, url) {

        return({
            email: email,
            entry_status: false,
            first_name: FirstName,
            last_name: LastName,
            school: School,
            role: Role,
            img_url: url,
            last_entry:  Timestamp.now(),
            last_exit:  Timestamp.now(),
        })
    }
    
    function userEntryRecordSchema(type, station){

        return({
            user_id: user.uid,
            first_name: userData.first_name,
            last_name: userData.last_name,
            timestamp: Timestamp.now(),
            acess_type: type,
            school: userData.school,
            station: station, 
        })
    }

    function stationDocumentModel(name,school){
        return({
            name: name, 
            school: school,
            file_url: "",
        })
    }
    
    
    const app = getFirebaseApp();
    const auth = getAuth(app);
    const db = getFirestore(app);
    const realtime_db = getDatabase(app);
    const storage = getStorage(app);

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
    let [ accessLog, setAccessLog] = useState([]);


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
        let AccessLogListener;

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

            AccessLogListener = onValue(ref(realtime_db,"/access_log/"+userData.school),(snapshot) => {
                console.log("updated acess log");
                const data = snapshot.val();

                //sets acess log to 2D array. This 2D array in the following form : 
                //[[log_id, {acess_Object containing properties such as first name}], [log_id, {acess_Object}], .....]
                setAccessLog(Object.entries(data));
            });

        }else{
            resetFirestoreState();
            if(StudentListListener != null){
                StudentListListener();
            }
            if(StationListener != null){
                StationListener();
            }
            if(AccessLogListener != null){
                AccessLogListener();
            }
        }
    }, [userData])

    //create user record in firestore database
    function createFirestoreUser (UUID , email, password, FirstName, LastName, School, Role, url){
        return setDoc(doc(db,"users", UUID), userDocumentModel(email,FirstName,LastName,School, Role, url))
    }

    //create station doc in firestore database
    function createStation (name,school){
        return addDoc(collection(db,"stations"), stationDocumentModel(name, school))
    }

    //delete station doc in firestore database
    function deleteStation (uid){
        try {
            deleteDoc(doc(db,"stations/"+uid));
        } catch (error) {
            console.log(error);
        }
        return deleteObject(sRef(storage,"stations/"+uid))
    }

    //delete station doc in firestore database
    function getStationFileURL (uid){
        return getDownloadURL(sRef(storage,"stations/"+uid))
    }

    //delete station doc in firestore database
    function createStationQrCodeFile(id){
        let definition = {
            content: [
                {text:"Securas Station:", margin: [200,100], fontSize:"30", color:"#89CFF1", bold:"true"},
                {qr : id, margin: [160, 120],fit:"230"}
            ]
        }   
        let pdfGenerator = pdfMake.createPdf(definition);
        pdfGenerator.getBlob((blob) => {
            return uploadBytes(sRef(storage,"stations/"+id),blob);
        })
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
        setAcessStations(temp_StationArray);
    }
    
    
    function resetFirestoreState() {
        setStudentList([]);
        setAcessStations([]);
        setAccessLog([]);
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
            //using string because chakraui selector cannot pass bool
            let now = Timestamp.now();
            if(status == "true" || status === true) {
                console.log("logging entry")
                try {
                    await updateDoc(doc(db,"users",id), {
                        entry_status: true,
                        last_entry: now,
                    });
                } catch (error) {
                    console.log(error);
                    return(error);
                }
            }
            else {
                console.log("logging exit")
                try {
                    await updateDoc(doc(db,"users",id), {
                        entry_status: false,
                        last_exit: now,
                    });
                } catch (error) {
                    console.log(error);
                    return(error);
                }
            }
        }
    }

    async function updateUserDataAccount(firstName,lastName, blobImage, uid){
        try {
            await uploadUserImage(blobImage, uid)
            try {
                let url = await getUserImageURL(uid);
                try {
                    return updateDoc(doc(db,"users", uid), {
                        first_name: firstName,
                        last_name: lastName,
                        img_url: url,
                    }); 
                } catch (error) {
                    throw error
                }
            } catch (error) {
                throw error;
            }
        } catch (error) {
            return error
        }
    }

    function uploadUserImage(blobImage, uid){
        return uploadBytes(sRef(storage,"userImages/"+uid),blobImage);
    }

    //delete station doc in firestore database
    function getUserImageURL (uid){
        return getDownloadURL(sRef(storage,"userImages/"+uid))
    }




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////Realtime DB Functions///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async function setBuildingTransfer(type,station){
        if (user) {
            try {
                await push(ref(realtime_db,"/access_log/"+userData.school), userEntryRecordSchema(type,station))
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
        acessStations,
        createStation,
        deleteStation,
        createStationQrCodeFile,
        getStationFileURL,
        accessLog,
        updateUserDataAccount,
        uploadUserImage,
        getUserImageURL
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 