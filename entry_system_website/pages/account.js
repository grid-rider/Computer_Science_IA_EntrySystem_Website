import { useAuth } from '../components/Firebase/Context/authUserContext';
import UserProfile from '../components/React/Profile';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, InputGroup, InputRightElement, Modal, Select, useColorModeValue } from '@chakra-ui/react';
import {
    SunIcon,
    ViewIcon,
    ViewOffIcon,
} from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export default function Account(){

    let { user } = useAuth();
    
    if(!user){
        return(<Text>Acess Denied: Please Log In</Text>)
    }

    //form handler
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    
    return(
        <Flex justifyContent="center" alignItems="center" height="100vh" flexDirection="column">

            <Flex flexDirection="column" borderRadius="12" background={formBackground} p="12" justifyContent="space-evenly">
                <Heading mb="1em">Sign Up Form</Heading>
                

                <form onSubmit={handleSubmit(signUp_ButtonHandler)}>
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