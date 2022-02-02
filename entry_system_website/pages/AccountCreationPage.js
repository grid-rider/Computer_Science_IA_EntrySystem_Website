import { Firebase_signUp} from '../components/Firebase/Firebase';
import { useRef } from 'react';

export default function AccountCreation() {
    let email = useRef();
    let password = useRef();    

    function submitButtonHandler(){
        Firebase_signUp(email.current.value, password.current.value).then(
            (res) => {
                console.log(res);
            }
        )
    }

    return (
        <div>
            <div className='AccountFormWrapper'>
                <label >Enter Email: <br></br>
                    <input ref={email} type="text" id = "email" name = "email"/>
                </label>
                <label>Enter Password:<br></br>
                    <input ref={password} type="password" id = "password" name = "password"/>
                </label>
                <button onClick={submitButtonHandler}>Create Account</button>
            </div>
        </div>
    )
}