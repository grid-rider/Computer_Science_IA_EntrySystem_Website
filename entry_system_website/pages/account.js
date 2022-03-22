import { useAuth } from '../components/Firebase/Context/authUserContext';
import UserProfile from '../components/React/Profile';
import { Avatar, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, InputGroup, InputRightElement, Modal, Select, Text, useColorModeValue } from '@chakra-ui/react';
import {
    SunIcon,
    ViewIcon,
    ViewOffIcon,
} from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import NavBar from '../components/React/View/NavBar';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";


export default function Account(){

    let { user } = useAuth();
    let [invalidSignUp, setInvalidSignUp] = useState(false);
    let [editMode, setEditMode] = useState(false);
    let [iconURL, setIconURL] = useState("");
    let [firstName, setFirstName] = useState("Loading.....");
    let [lastName, setLastName] = useState("Loading.....");

    //object schema for image file upload validation
    const schema = yup.object().shape({
        picture: yup
            .mixed()
            .test('required', "You need to provide a file", (value) =>{
                return value && value.length
            } )
            .test("fileSize", "Image File To Larg", (value, context) => {
                return value && value[0] && value[0].size <= 200000;
            })
    });

    //form handler
    const { register, handleSubmit, formState: { errors, isSubmitting } } =  useForm({
        resolver: yupResolver(schema),
      });
      

    function saveEditButtonHandler(data){
        console.log(data)
    }

    function handleUserIconChange(event){
        console.log(event.target.files[0])
        console.log(URL.createObjectURL(event.target.files[0]))
        setIconURL(URL.createObjectURL(event.target.files[0]))
    }
    
    return(
        <>
            <NavBar/>
            <Flex justifyContent="center" alignItems="center"  flexDirection="column">
                <Flex flexDirection="column" alignItems="center" borderRadius="12" width="80vw" background="gray.100" p="12" justifyContent="space-evenly" color="black">
                    <Heading mb="1em">Edit Account</Heading>
                    <Avatar width="8em" height="8em" src={iconURL}/>
                    <Box width="100%">
                        <form onSubmit={handleSubmit(saveEditButtonHandler)}>
                            <FormControl  m={1} isInvalid={errors.picture} onChange={handleUserIconChange}>
                                <FormLabel>User Icon</FormLabel>
                                <Input p="0.1em" variant="unstyled"  {...register("picture")} type="file" name="picture"/>
                                <FormErrorMessage>
                                {errors.picture && errors.picture.message}
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

                            <HStack mt="2em">
                                <Button width="100%" colorScheme="teal" type='submit' isLoading={isSubmitting}>Set Account</Button>
                            </HStack>
                        </form>
                    </Box>


                    <div style={{display: !invalidSignUp ? "none" : "block", color: "red", fontSize: "1em", margin: "0 auto"}}>Invalid Email or Password</div>
                </Flex>
            </Flex>       
        </>


    )
}