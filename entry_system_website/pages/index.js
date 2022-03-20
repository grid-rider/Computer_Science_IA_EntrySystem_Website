  import Head from 'next/head'
  import styles from '../styles/Home.module.css'
  import Link from 'next/link'
  import { useAuth } from '../components/Firebase/Context/authUserContext'
  import { useEffect, useState } from 'react'
  import { AspectRatio, Box, Menu, MenuItem, Center, Container, Flex, Image, useColorMode ,Button, IconButton, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, MenuButton, MenuList, Heading, Text} from '@chakra-ui/react';
  import { LockIcon, PlusSquareIcon, SunIcon , UnlockIcon} from '@chakra-ui/icons';
  import UserProfile from '../components/React/Profile';
  import {FaUserCircle} from "react-icons/fa";
  import { HamburgerIcon } from '@chakra-ui/icons'

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
        <Flex flexDir="row" justifyContent="space-between" alignItems="center" padding="1em" width="100vw" marginBottom="2em">
          <HStack>
            <svg
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18 10.5C19.6569 10.5 21 11.8431 21 13.5V19.5C21 21.1569 19.6569 22.5 18 22.5H6C4.34315 22.5 3 21.1569 3 19.5V13.5C3 11.8431 4.34315 10.5 6 10.5V7.5C6 4.18629 8.68629 1.5 12 1.5C15.3137 1.5 18 4.18629 18 7.5V10.5ZM12 3.5C14.2091 3.5 16 5.29086 16 7.5V10.5H8V7.5C8 5.29086 9.79086 3.5 12 3.5ZM18 12.5H6C5.44772 12.5 5 12.9477 5 13.5V19.5C5 20.0523 5.44772 20.5 6 20.5H18C18.5523 20.5 19 20.0523 19 19.5V13.5C19 12.9477 18.5523 12.5 18 12.5Z"
                fill="currentColor"
              />
            </svg>
            <Heading fontSize="1.3em">Securas</Heading>

          </HStack>


          <HStack>
            <HStack display={{base:"none",xl:"inline"}}>
              {user ? 
                <>
                  <Button leftIcon={<UnlockIcon />} onClick={Firebase_signOut} colorScheme='teal' variant='ghost'>
                    Sign Out
                  </Button>
                  <UserProfile/>
                </>
                :
                <>
                  <Button as="a" href="/SignInPage" leftIcon={<LockIcon />} colorScheme='teal' variant='ghost'>
                    Sign in 
                  </Button>
                  <Button as="a" href="/SignUpPage" leftIcon={<LockIcon />} colorScheme='teal' variant='ghost'>
                    Sign Up 
                  </Button>
                </>
              }

            </HStack>
            <Menu>
              <MenuButton display={{base:"inline",xl:"none"}} as={IconButton} variant="unstyled" icon={<HamburgerIcon w="2em" h="2em"/>}>Menu
              </MenuButton>
              <MenuList>
                {user ? 
                  <>
                    <MenuItem as="a" href="/account"icon={<FaUserCircle/>}>Account</MenuItem>
                    <MenuItem  onClick={Firebase_signOut} icon={<UnlockIcon />}>Sign Out</MenuItem>
                  </>
                  :
                  <>
                    <MenuItem as="a" href="/SignInPage">Sign In</MenuItem>
                    <MenuItem as="a" href="/SignUpPage">Create Account</MenuItem>
                  </>
                }
              </MenuList>
            </Menu>
            <Button onClick={toggleColorMode}>
                <SunIcon/>
            </Button>
          </HStack>


        </Flex>

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
