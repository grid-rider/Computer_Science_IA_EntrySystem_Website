import { useAuth } from '../components/Firebase/Context/authUserContext'
import { useEffect, useState } from 'react'
import { AspectRatio, Box, Menu, MenuItem, Center, Container, Flex, Image, useColorMode, Button, IconButton, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, MenuButton, MenuList, Heading, Text } from '@chakra-ui/react';
import NavBar from '../components/React/View/NavBar'

export default function Home() {

  //userData provided through custom useAuth hook that provides acess
  //to context state variables and functions
  let { user, userData } = useAuth();

  //Is teacher state variable that is initially set to false when component page is loaded 
  //and causes a component rerender when changed with setIsteacher function 
  let [isTeacher, setIsTeacher] = useState(false)
  //Note: the above decleration uses object destructuring


  //UseEffect hook is a Listener that 
  useEffect(() => {
    if (userData) {                    //if userData is available
      if (userData.role === "teacher") { //using userData schema
        setIsTeacher(true);      //changing state
      } else {
        setIsTeacher(false);    //changing state 
      }
    } else {
      setIsTeacher(false);   //changing state
    }

  }, [userData]); //Invoke the function above when userData changes

  return ( //returning JSX (html in javascript)
    <Flex flexDir="column" alignItems="center">
      <NavBar />

      {/*Using inline if statement to check if current user is actually logged in and changing component*/}
      {user ?
        <Flex
          bgGradient='linear(to-b, blue.400, green.500 )'
          as="a" _hover={{ bgGradient: 'linear(to-b, green.100, green.500 )' }}
          href="Entry" justifyContent="center" boxShadow="xl" alignItems="center"
          borderRadius="1000rem" width={{ base: "80vw", sm: "50vw", md: "md" }}
          height={{ base: "80vw", sm: "50vw", md: "md" }}>
          <Heading align="center">To Start Please Press Here</Heading>
        </Flex>
        :
        <Flex
          bgGradient='linear(to-b, blue.400, green.500 )'
          as="a"
          _hover={{ bgGradient: 'linear(to-b, green.100, green.500 )' }}
          href="SignInPage"
          justifyContent="center"
          boxShadow="xl" alignItems="center"
          borderRadius="1000rem"
          width={{ base: "80vw", sm: "50vw", md: "md" }}
          height={{ base: "80vw", sm: "50vw", md: "md" }}>
          <Heading align="center">Press Here To Sign In</Heading>
        </Flex>
      }

      {/*Checking if current user is teacher when providing acess to teacher section */}
      {isTeacher ?

        <Flex
          marginTop="2em"
          bgGradient='linear(to-b, blue.400, green.500 )' 
          as="a" 
          _hover={{ bgGradient: 'linear(to-b, green.100, green.500 )' }} 
          href="/teacher/AcessTable" 
          justifyContent="center" 
          boxShadow="xl" 
          alignItems="center" 
          borderRadius="1000rem" 
          width={{ base: "80vw", sm: "50vw", md: "md" }} 
          height={{ base: "80vw", sm: "50vw", md: "md" }}>
          <Heading align="center">Press Here To Enter Teacher Section</Heading>
        </Flex>
        :
        <Flex 
          marginTop="2em" 
          bgGradient='linear(to-b, blue.400, green.500 )' 
          justifyContent="center" 
          boxShadow="xl" 
          alignItems="center" 
          borderRadius="1000rem" 
          width={{ base: "80vw", sm: "50vw", md: "md" }} 
          height={{ base: "80vw", sm: "50vw", md: "md" }} 
          flexDir="column">
          <Heading align="center">Teacher Section</Heading>
          <Heading align="center" color="red">Acess Denied</Heading>
        </Flex>
      }
      <Box as="section" marginTop="2em">
        <Heading align="center">The Story</Heading>
        <Text>As Part of the continued move of digitalization</Text>
      </Box>
    </Flex>
  )
}
