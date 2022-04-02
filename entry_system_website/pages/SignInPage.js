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
    useToast,
} from '@chakra-ui/react'

import {
    SunIcon,
    ViewIcon,
    ViewOffIcon,
    AlertIcon
} from '@chakra-ui/icons';
import NavBar from '../components/React/View/NavBar';


export default function SignInPage (){

    let { signIn , user} = useAuth();
    const router = useRouter();
    let toast = useToast();

    //form handler
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    let [invalidLogin , setInvalidLogin] = useState(false);
    let [showPassword, setShowPassword] = useState(false);


    //color mode
    let formBackground = useColorModeValue("gray.100","gray.700");
    const { colorMode, toggleColorMode } = useColorMode();

    async function signIn_ButtonHandler(data){
        try {
            let sign_in = await signIn(data.email, data.password);
            setInvalidLogin(false);
            toast({ //toast icon is generated with a duration of 9000ms to provide feedback for user
                title: 'Account Setup',
                description: "You Have Been Signed In",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            router.push("/");
        } catch (error) {
            setInvalidLogin(true); //Providing user feedback by setting invalid state to true
            console.log(error.message);
        }
    }

    useEffect(() => {
        if(user) {
            router.push("/");
        }
    }, [])


    return (
        <>
        <NavBar/>
        <Flex justifyContent="center" alignItems="center" height="100vh" flexDirection="column">
            <Flex flexDirection="column" borderRadius="12" background={formBackground} p="12" justifyContent="space-evenly">
                <Heading mb="1em">Sign In Form</Heading>
                

                <form onSubmit={handleSubmit(signIn_ButtonHandler)}> {/**Setting signup form to pass data to signIn_ButtonHandler */}
                    <FormControl  m={1} isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder='Enter Email' {...register("email", { required: {value: true ,message: "Entry Required"}})}/>
                        <FormErrorMessage>
                            {errors.email && errors.email.message} {/**Error message displayed when validation fails */}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl  m={1} isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input id="password" type={showPassword? "text" : "password"} placeholder='Enter Password' {...register("password", { required: {value: true ,message: "Entry Required"}})}/>
                            <InputRightElement>
                                {/**Implementing hide password functionality to provide better security */}
                                <Button variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <ViewOffIcon/> : <ViewIcon/>}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                                {errors.password && errors.password.message}
                        </FormErrorMessage>

                    </FormControl>

                    <HStack mt="2em">
                        {/**Submit section */}
                        <Button width="100%" colorScheme="teal" type='submit' isLoading={isSubmitting}>Sign In</Button>
                        <Button onClick={toggleColorMode}><SunIcon/></Button>
                    </HStack>
                </form>
                <div style={{display: !invalidLogin ? "none" : "block", color: "red", fontSize: "1em", margin: "0 auto"}}>Invalid Email or Password</div>
            </Flex>
        </Flex>
        </>
    )
}