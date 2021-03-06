import { useAuth } from '../components/Firebase/Context/authUserContext';
import UserProfile from '../components/React/View/ProfileIcon.js';
import { useToast, Avatar, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, InputGroup, InputRightElement, Modal, Select, Text, useColorModeValue, EditableInput, Editable, EditablePreview } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import NavBar from '../components/React/View/NavBar';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from 'react';


export default function Account(){

    let { user, userData, updateUserDataAccount } = useAuth();
    const toast = useToast();
    let [invalidSignUp, setInvalidSignUp] = useState(false);
    let [iconURL, setIconURL] = useState("");
    let [firstName, setFirstName] = useState(null);
    let [lastName, setLastName] = useState(null);

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
    const { register, handleSubmit, formState: { errors, isSubmitting } } =  useForm({
        resolver: yupResolver(schema),
    });
      

    async function saveEditButtonHandler(data){
        try {
            await updateUserDataAccount(data.firstName, data.lastName, data.picture[0], user.uid).then(() => {
                toast({
                    title: 'Account Changes Saved.',
                    description: "Your profile image, firstname and last name have been updated",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            })
        } catch (error) {
            console.log(error);
        }

    }

    function handleUserIconChange(event){
        setIconURL(URL.createObjectURL(event.target.files[0]))
    }

    useEffect(() => {
        if(userData){
            setFirstName(userData.first_name);
            setLastName(userData.last_name);
            setIconURL(userData.img_url);
        }
    }, [userData]);
    
    return(
        <>
            <NavBar/>
            <Flex justifyContent="center" alignItems="center"  flexDirection="column">
                <Flex flexDirection="column" alignItems="center" borderRadius="12" width="80vw" background="gray.100" p="12" justifyContent="space-evenly" color="black">
                    <Heading mb="1em">Edit Account</Heading>
                    <Avatar width="8em" height="8em" src={iconURL}/>
                    <Box width="100%">
                        <form onSubmit={handleSubmit(saveEditButtonHandler)}>
                            <FormControl  m={1} isInvalid={errors.picture} onChange={handleUserIconChange} isRequired>
                                <FormLabel>User Icon</FormLabel>    
                                <Input p="0.1em" variant="unstyled"  {...register("picture")} type="file" name="picture" />
                                <FormErrorMessage>
                                {errors.picture && errors.picture.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl  m={1} isInvalid={errors.firstName} isRequired>
                                <FormLabel>First Name</FormLabel>
                                <Input color="white" backgroundColor="gray.800" boxShadow="lg" defaultValue={firstName} {...register("firstName", { required: {value: true ,message: "Entry Required"}})}/>
                                <FormErrorMessage>
                                        {errors.firstName && errors.firstName.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl  m={1} isInvalid={errors.lastName} isRequired>
                                <FormLabel>Last Name</FormLabel>
                                <Input color="white" backgroundColor="gray.800" boxShadow="lg" defaultValue={lastName} {...register("lastName", { required: {value: true ,message: "Entry Required"}})}/>
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