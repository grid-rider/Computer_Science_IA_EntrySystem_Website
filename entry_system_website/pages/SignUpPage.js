import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useAuth } from '../components/Firebase/Context/authUserContext';

export default function AccountCreation() {

    let { createAccount, createFirestoreUser, deleteAccount, resetAuthState} = useAuth();
    let [invalidSignUp, setInvalidSignUp] = useState(false);
    let router = useRouter();


    let email = useRef();
    let password = useRef();    
    let firstName = useRef();    
    let lastName = useRef();    
    let school = useRef();    

    /*
    function signUp_ButtonHandler(){

        let email_entry = email.current.value;
        let password_entry = password.current.value;
        let firstName_entry = firstName.current.value;
        let lastName_entry = lastName.current.value;
        let school_entry = school.current.value; 

        createAccount(email_entry, password_entry).then(
        (res) => {
            setInvalidSignUp(false);
            console.log(res);
            createFirestoreUser( res.user.uid ,email_entry, password_entry, firstName_entry, lastName_entry, school_entry).then((addDoc_res) => {
                setInvalidSignUp(false);
                console.log(addDoc_res);
                router.push("SignInPage");
            }).catch((err) => {
                setInvalidSignUp(true);
                console.log("issue with user doc creation : " + err);
                deleteAccount().then((res) => {
                    resetAuthState();
                }).catch((err_) => {
                    console.log("issue with user account deletion : " + err_);
                })
            })
        }).catch((err) => {
            setInvalidSignUp(true);
            console.log(err);
        });
    }
    */

    async function signUp_ButtonHandler(){
        let email_entry = email.current.value;
        let password_entry = password.current.value;
        let firstName_entry = firstName.current.value;
        let lastName_entry = lastName.current.value;
        let school_entry = school.current.value; 

        try {
            let user = await createAccount(email_entry, password_entry);
            console.log(user);
            let user_doc = await createFirestoreUser( res.user.uid ,email_entry, password_entry, firstName_entry, lastName_entry, school_entry);
            setInvalidSignUp(false);
            console.log(user_doc);
            router.push("SignInPage");
        } catch (error) {
            console.log("error");
            setInvalidSignUp(true);
        }

    }

    return (
        <div className='a'>
            <label >Enter Email: <br></br>
                <input ref={email} type="text" id = "email" name = "email"/>
            </label>
            <label>Enter Password:<br></br>
                <input ref={password} type="password" id = "password" name = "password" />
            </label>
            <label>Enter First Name:<br></br>
                <input ref={firstName} type="text" id = "FirstName" name = "FirstName" />
            </label>
            <label>Enter Last Name:<br></br>
                <input ref={lastName} type="text" id = "LastName" name = "LastName" />
            </label>
            <label>Select Schol Name.<br></br>
                <select ref={school}>
                    <option value="LeipzigInternationalSchool">Leipzig International School</option>
                </select>
            </label>
            <button onClick={signUp_ButtonHandler}>Sign Up</button>
            <div style={{display: !invalidSignUp ? "none" : "block", color: "red", fontSize: "1em", margin: "0 auto"}}>Invalid Email or Password</div>
        </div>

        
    )
}