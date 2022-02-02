import { Firebase_signUp} from '../components/Firebase/Firebase';
import { useRef } from 'react';

export default function AccountCreation() {
    let email = useRef();
    let password = useRef();


    


    function submitButtonHandler(){
        let response = Firebase_signUp(email.current.value, password.current.value);
        console.log(response); 
    }

    return (
        <div>
            <div>
                <label >Enter Email:
                    <input ref={email} type="text" id = "email" name = "email"/>
                </label>
                <label>Enter Password:
                    <input ref={password} type="password" id = "password" name = "password"/>
                </label>
            </div>
            <button onClick={submitButtonHandler}></button>

            <style jsx>{`
                button {
                    width: 2em;
                    height: 2em;
                }
                `}
            </style>
        </div>
    )
}