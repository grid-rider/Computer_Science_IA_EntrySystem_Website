import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../components/Firebase/Context/authUserContext';
import { useToast, Avatar, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, InputGroup, InputRightElement, Modal, Select, useColorModeValue } from '@chakra-ui/react';
import {
    SunIcon,
    ViewIcon,
    ViewOffIcon,
} from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";


export default function AccountCreation() {

    let { createAccount, createFirestoreUser, uploadUserImage, resetAuthState, getUserImageURL} = useAuth();
    let [invalidSignUp, setInvalidSignUp] = useState(false);
    let [showPassword, setShowPassword] = useState(false);
    let [iconURL, setIconURL] = useState("");



    //object schema for image file upload validation
    const schema = yup.object().shape({
        picture: yup
            .mixed()
            .test('required', "You need to provide a file", (value) =>{
                return value && value.length
            } )
            .test("fileSize", "Image File To Larg", (value, context) => {
                return value && value[0] && value[0].size <= 2000000;
            })
    });


    //form handler
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
    });
      

    //color mode
    let formBackground = useColorModeValue("gray.100","gray.700");
    const { colorMode, toggleColorMode } = useColorMode();

    //page routing
    let router = useRouter();   

    //toast 
    const toast = useToast();


    async function signUp_ButtonHandler(data){
        try {
            let user = await createAccount(data.email, data.password);
            setInvalidSignUp(false);
            await uploadUserImage(data.picture[0], user.user.uid).then(() => {
                toast({
                    title: 'Account Setup',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            })
            let url = await getUserImageURL(user.user.uid);
            let user_doc = await createFirestoreUser( user.user.uid ,data.email, data.password, data.firstName, data.lastName, data.school, data.role, url); 
            router.push("/");
        } catch (error) {
            console.log(error);
            setInvalidSignUp(true);
        }

    }

    function handleUserIconChange(event){
        setIconURL(URL.createObjectURL(event.target.files[0]))
    }

    return (
        <Flex justifyContent="center" alignItems="center" height="100vh" flexDirection="column">

            <Flex flexDirection="column" borderRadius="12" background={formBackground} paddingLeft="12" paddingRight="12" py="2em" alignItems="center" justifyContent="space-evenly">
                <Heading mb="0.4em">Sign Up Form</Heading>
                
                <Avatar width="4em" height="4em" src={iconURL}/>
                <form onSubmit={handleSubmit(signUp_ButtonHandler)}>
                    <FormControl  m={1} isInvalid={errors.picture} onChange={handleUserIconChange}>
                        <FormLabel>User Icon</FormLabel>
                        <Input p="0.1em" variant="unstyled" {...register("picture")} type="file" name="picture"/>
                        <FormErrorMessage>
                        {errors.picture && errors.picture.message}
                        </FormErrorMessage>
                    </FormControl>

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

                    <FormControl  m={1} isInvalid={errors.firstName}>
                        <FormLabel>First Name</FormLabel>
                        <Input placeholder='Enter First Name' {...register("firstName", { required: {value: true ,message: "Entry Required"}})}/>
                        <FormErrorMessage>
                                {errors.firstName && errors.firstName.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl  m={1} isInvalid={errors.lastName}>
                        <FormLabel>Last Name</FormLabel>
                        <Input placeholder='Enter Last Name' {...register("lastName", { required: {value: true ,message: "Entry Required"}})}/>
                        <FormErrorMessage>
                                {errors.lastName && errors.lastName.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl m={1}>
                        <FormLabel>School</FormLabel>
                        <Select {...register("school")}>
                            <option value="LeipzigInternationalSchool">Leipzig International School</option>
                        </Select>
                    </FormControl>

                    <FormControl m={1}>
                        <FormLabel>Occupation</FormLabel>
                        <Select {...register("role")}>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </Select>
                    </FormControl>

                    <HStack mt="2em">
                        <Button width="100%" colorScheme="teal" type='submit' isLoading={isSubmitting}>Sign Up</Button>
                        <Button onClick={toggleColorMode}><SunIcon/></Button>
                    </HStack>
                </form>

                <div style={{display: !invalidSignUp ? "none" : "block", color: "red", fontSize: "1em", margin: "0 auto"}}>Invalid Email or Password</div>
            </Flex>
        </Flex>

        
    )
}