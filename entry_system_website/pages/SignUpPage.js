import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useAuth } from '../components/Firebase/Context/authUserContext';
import { Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputRightElement, Select, useColorModeValue } from '@chakra-ui/react';
import {
    SunIcon,
    ViewIcon,
    ViewOffIcon,
} from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';


export default function AccountCreation() {

    let { createAccount, createFirestoreUser, deleteAccount, resetAuthState} = useAuth();
    let [invalidSignUp, setInvalidSignUp] = useState(false);
    let [showPassword, setShowPassword] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    let formBackground = useColorModeValue("gray.100","gray.700");
    let router = useRouter();


    let email = useRef();
    let password = useRef();    
    let firstName = useRef();    
    let lastName = useRef();    
    let school = useRef();    

    async function signUp_ButtonHandler(){
        let email_entry = email.current.value;
        let password_entry = password.current.value;
        let firstName_entry = firstName.current.value;
        let lastName_entry = lastName.current.value;
        let school_entry = school.current.value; 

        try {
            let user = await createAccount(email_entry, password_entry);
            console.log(user);
            let user_doc = await createFirestoreUser( user.user.uid ,email_entry, password_entry, firstName_entry, lastName_entry, school_entry);
            setInvalidSignUp(false);
            console.log(user_doc);
            router.push("SignInPage");
        } catch (error) {
            console.log(error);
            setInvalidSignUp(true);
        }

    }

    return (
        <Flex justifyContent="center" alignItems="center" height="100vh" flexDirection="column">

            <Flex flexDirection="column" borderRadius="12" background={formBackground} p="12" justifyContent="space-evenly">
                <Heading mb="1em">Sign Up Form</Heading>
                <FormControl  m={1}>
                    <FormLabel>Email</FormLabel>
                    <Input type="Email" placeholder='Enter Email'/>
                </FormControl>

                <FormControl  m={1}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input type={showPassword? "string" : "Password"} placeholder='Enter Password'/>
                        <InputRightElement>
                            <Button variant="ghost" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <ViewOffIcon/> : <ViewIcon/>}</Button>
                        </InputRightElement>
                    </InputGroup>

                </FormControl>

                <FormControl  m={1}>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder='Enter Fullname in the format: Max Master'/>
                </FormControl>

                <FormControl m={1}>
                    <FormLabel>School</FormLabel>
                    <Select>
                        <option value="LeipzigInternationalSchool">Leipzig International School</option>
                    </Select>
                </FormControl>
                <HStack mt="2em">
                    <Button width="100%" onClick={signUp_ButtonHandler} colorScheme="teal">Sign Up</Button>
                    <Button onClick={toggleColorMode}><SunIcon/></Button>
                </HStack>
                <div style={{display: !invalidSignUp ? "none" : "block", color: "red", fontSize: "1em", margin: "0 auto"}}>Invalid Email or Password</div>
            </Flex>

        </Flex>

        
    )
}