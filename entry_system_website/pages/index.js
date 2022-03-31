  import Head from 'next/head'
  import styles from '../styles/Home.module.css'
  import Link from 'next/link'
  import { useAuth } from '../components/Firebase/Context/authUserContext'
  import { useEffect, useState } from 'react'
  import { AspectRatio, Box, Menu, MenuItem, Center, Container, Flex, Image, useColorMode ,Button, IconButton, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, MenuButton, MenuList, Heading, Text} from '@chakra-ui/react';  
import NavBar from '../components/React/View/NavBar'

  export default function Home() {
    const { colorMode, toggleColorMode } = useColorMode()
    let { user, Firebase_signOut, userData} = useAuth();
    let [isTeacher, setIsTeacher] = useState(false)
    
    useEffect(() => {
      if(userData){
        if(userData.role === "teacher"){
          setIsTeacher(true);
        } else {
          setIsTeacher(false);
        }
      } else{
        setIsTeacher(false);
      }

    }, [userData]);

    return (
      <Flex flexDir="column" alignItems="center">
        <NavBar/>

        {user?
            <Flex bgGradient='linear(to-b, blue.400, green.500 )' as="a" _hover={{bgGradient: 'linear(to-b, green.100, green.500 )'}} href="Entry" justifyContent="center" boxShadow="xl"alignItems="center" borderRadius="1000rem" width={{base:"80vw",sm:"50vw", md:"md"}} height={{base:"80vw",sm:"50vw",md:"md"}}>
              <Heading align="center">To Start Please Press Here</Heading>
            </Flex>

          :
          
            <Flex bgGradient='linear(to-b, blue.400, green.500 )' as="a" _hover={{bgGradient: 'linear(to-b, green.100, green.500 )'}} href="SignInPage" justifyContent="center" boxShadow="xl"alignItems="center" borderRadius="1000rem" width={{base:"80vw",sm:"50vw", md:"md"}} height={{base:"80vw",sm:"50vw",md:"md"}}>
              <Heading align="center">Press Here To Sign In</Heading>
            </Flex>
        }

        {isTeacher?

            <Flex marginTop="2em" bgGradient='linear(to-b, blue.400, green.500 )' as="a" _hover={{bgGradient: 'linear(to-b, green.100, green.500 )'}} href="/dashboard/teacher/AcessTable" justifyContent="center" boxShadow="xl"alignItems="center" borderRadius="1000rem" width={{base:"80vw",sm:"50vw", md:"md"}} height={{base:"80vw",sm:"50vw",md:"md"}}>
              <Heading align="center">Press Here To Enter Teacher Section</Heading>
            </Flex>
            :
            <Flex marginTop="2em" bgGradient='linear(to-b, blue.400, green.500 )' justifyContent="center" boxShadow="xl"alignItems="center" borderRadius="1000rem" width={{base:"80vw",sm:"50vw", md:"md"}} height={{base:"80vw",sm:"50vw",md:"md"}} flexDir="column">
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
