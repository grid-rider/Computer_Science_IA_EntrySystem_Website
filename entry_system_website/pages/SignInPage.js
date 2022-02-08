import { Firebase_signIn, auth, Firebase_signOut} from '../components/Firebase/Firebase';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../components/Firebase/Context/authUserContext';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
    Flex, 
    Heading,
    Input,
    FormControl,
    FormErrorMessage,
    FormLabel,
    InputGroup,
    InputRightElement,
    HStack,
    useColorMode,
    useColorModeValue,
    Button,
} from '@chakra-ui/react'

import {
    SunIcon,
    ViewIcon,
    ViewOffIcon,
    AlertIcon
} from '@chakra-ui/icons';


export default function SignInPage (){

    let { signIn , user} = useAuth();
    const router = useRouter();

    //form handler
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    let [showPassword, setShowPassword] = useState(false);
    let [invalidLogin,setInvalidLogin] = useState(false);


    //color mode
    let formBackground = useColorModeValue("gray.100","gray.700");
    const { colorMode, toggleColorMode } = useColorMode();

    async function signIn_ButtonHandler(data){
        try {
            let sign_in = await signIn(data.email, data.password);
            router.push("StudentDashboard");
        } catch (error) {
            console.log(error.message);
            setInvalidLogin(true);
        }
    }

    useEffect(() => {
        if(user) {
            router.push("StudentDashboard");
        }
    }, [])


    return (
        <Flex justifyContent="center" alignItems="center" height="100vh" flexDirection="column">

            <Flex flexDirection="column" borderRadius="12" background={formBackground} p="12" justifyContent="space-evenly">
                <Heading mb="1em">Sign In Form</Heading>
                

                <form onSubmit={handleSubmit(signIn_ButtonHandler)}>
                    <FormControl  m={1} isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder='Enter Email' {...register("email", { required: {value: true ,message: "Entry Required"}})}/>
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl  m={1} isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input id="password" type={showPassword? "text" : "password"} placeholder='Enter Password' {...register("password", { required: {value: true ,message: "Entry Required"}})}/>
                            <InputRightElement>
                                <Button variant="ghost" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <ViewOffIcon/> : <ViewIcon/>}</Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                                {errors.password && errors.password.message}
                        </FormErrorMessage>

                    </FormControl>

                    <HStack mt="2em">
                        <Button width="100%" colorScheme="teal" type='submit' isLoading={isSubmitting}>Sign In</Button>
                        <Button onClick={toggleColorMode}><SunIcon/></Button>
                    </HStack>
                </form>

                {invalidLogin &&
                    <Alert status="error">
                        <AlertIcon/>
                        Invalid Email or Password
                    </Alert>
                }

            </Flex>
        </Flex>
    )
}