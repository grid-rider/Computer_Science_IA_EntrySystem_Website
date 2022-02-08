import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useAuth } from '../components/Firebase/Context/authUserContext'
import { useEffect } from 'react'
import { AspectRatio, Box, Center, Container, Flex, Image, useColorMode ,Button, IconButton, HStack, useDisclosure, Modal, ModalOverlay, ModalContent} from '@chakra-ui/react';
import { LockIcon, PlusSquareIcon, SunIcon , UnlockIcon} from '@chakra-ui/icons';
import UserProfile from '../components/React/Profile';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()


  let { user, Firebase_signOut , signIn} = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <Box>
        <Flex justify="space-between" padding="20px">
          <Image src="./svg/Logo.jpg" objectFit="contain"/>
          <HStack>
            {user ? 
              <>
                <Button leftIcon={<UnlockIcon />} onClick={Firebase_signOut} colorScheme='teal' variant='ghost'>
                  Sign Out
                </Button>
                <UserProfile/>
                <Button colorScheme='blue' variant='solid'>
                  <Link href="/Dashboard">Dashboard</Link>
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

            <Button onClick={toggleColorMode}>
              <SunIcon/>
            </Button>
          </HStack>
        </Flex>
    </Box>
  )
}
