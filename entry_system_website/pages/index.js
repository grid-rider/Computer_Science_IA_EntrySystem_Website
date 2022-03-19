  import Head from 'next/head'
  import styles from '../styles/Home.module.css'
  import Link from 'next/link'
  import { useAuth } from '../components/Firebase/Context/authUserContext'
  import { useEffect, useState } from 'react'
  import { AspectRatio, Box, Menu, MenuItem, Center, Container, Flex, Image, useColorMode ,Button, IconButton, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, MenuButton, MenuList} from '@chakra-ui/react';
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
      <Box>
          <Flex flexDir="column">
            <Flex flexDir="row" justifyContent="space-between" alignItems="center" padding="1em">
              <Image src="./svg/Logo.jpg" objectFit="contain"/>
              <HStack display={{base:"none",xl:"inline"}}>
                {user ? 
                  <>
                    <Button leftIcon={<UnlockIcon />} onClick={Firebase_signOut} colorScheme='teal' variant='ghost'>
                      Sign Out
                    </Button>
                    <UserProfile/>
                    <Button colorScheme='blue' variant='solid' isLoading={dashboardButtonLoading}>
                      <Link href={dashboardSelector}>Dashboard</Link>
                    </Button> 
                  </>
                  :
                  <>
                    <Button leftIcon={<LockIcon />} colorScheme='teal' variant='ghost'>
                      <Link href="/SignInPage">Sign In</Link>
                    </Button>
                    <Button leftIcon={<PlusSquareIcon />} colorScheme='teal' variant='ghost'>
                      <Link href="/SignUpPage">Create Account</Link>
                    </Button>
                  </>
                }
              </HStack>
              <HStack>
                <Menu display={{base:"inline",xl:"none"}}>
                  <MenuButton as={IconButton} variant="unstyled" icon={<HamburgerIcon w="1.5em" h="1.5em"/>}>Menu
                  </MenuButton>
                  <MenuList>
                    {user ? 
                      <>
                        <MenuItem icon={<FaUserCircle/>}>Profile</MenuItem>
                        <MenuItem>Sign Out</MenuItem>

                      </>
                      :
                      <>
                        <MenuItem>Sign In</MenuItem>
                        <MenuItem>Create Account</MenuItem>
                      </>
                    }
                  </MenuList>
                </Menu>
                <Button onClick={toggleColorMode}>
                    <SunIcon/>
                </Button>
              </HStack>

            </Flex>

            


          </Flex>
      </Box>
    )
  }
