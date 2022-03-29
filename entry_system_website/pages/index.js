  import Head from 'next/head'
  import styles from '../styles/Home.module.css'
  import Link from 'next/link'
  import { useAuth } from '../components/Firebase/Context/authUserContext'
  import { useEffect, useState } from 'react'
  import { AspectRatio, Box, Menu, MenuItem, Center, Container, Flex, Image, useColorMode ,Button, IconButton, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, MenuButton, MenuList, Heading, Text} from '@chakra-ui/react';
  import { LockIcon, PlusSquareIcon, SunIcon , UnlockIcon} from '@chakra-ui/icons';
  import UserProfile from '../components/React/Profile';
  import {FaUserCircle} from "react-icons/fa";
  import { HamburgerIcon } from '@chakra-ui/icons';
import NavBar from '../components/React/View/NavBar'

//Dictionary used to deffer user to appropriate page
const initialRoleLandingPages = {
    "teacher": "RowView",
    "student": "StudentView"
}


  export default function Home() {

    const { colorMode, toggleColorMode } = useColorMode()


    let { user, Firebase_signOut, userData} = useAuth();
    let [dashboardButtonLoading, setDashboardButtonLoading] = useState(true)
    let [dashboardSelector, setDashboardSelector] = useState("")
    
    useEffect(() => {
      if(userData){
        setDashboardSelector("dashboard/" + userData.role + "/" + initialRoleLandingPages[userData.role]);
        setDashboardButtonLoading(false);
      } else {
        setDashboardButtonLoading(true);
      }
    }, [userData]);

    return (
      <Flex flexDir="column" alignItems="center">
        <NavBar/>

        {user?
            <Flex bgGradient='linear(to-b, blue.400, green.500 )' as="a" _hover={{bgGradient: 'linear(to-b, green.100, green.500 )'}} href={dashboardSelector} justifyContent="center" boxShadow="xl"alignItems="center" borderRadius="1000rem" width={{base:"80vw",sm:"60vw", md:"md"}} height={{base:"80vw",sm:"60vw",md:"md"}}>
              <Heading align="center">To Start Please Press Here</Heading>
            </Flex>
          :
          
            <Flex bgGradient='linear(to-b, blue.400, green.500 )' as="a" _hover={{bgGradient: 'linear(to-b, green.100, green.500 )'}} href="SignInPage" justifyContent="center" boxShadow="xl"alignItems="center" borderRadius="1000rem" width={{base:"80vw",sm:"60vw", md:"md"}} height={{base:"80vw",sm:"60vw",md:"md"}}>
              <Heading align="center">Press Here To Sign In</Heading>
            </Flex>
        }

        <Box as="section" marginTop="2em">
          <Heading align="center">The Story</Heading>
          <Text>As Part of the continued move of digitalization</Text>
        </Box>


        


      </Flex>
    )
  }
