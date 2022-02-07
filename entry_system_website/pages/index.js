import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useAuth } from '../components/Firebase/Context/authUserContext'
import { useEffect } from 'react'
import { AspectRatio, Box, Center, Container, Flex, Image, useColorMode ,Button, IconButton, HStack} from '@chakra-ui/react';
import { LockIcon, PlusSquareIcon, SunIcon } from '@chakra-ui/icons';



export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()

  let { user, Firebase_signOut , signIn} = useAuth();

  return (
    <Box>
        <Flex justify="space-between" padding="20px">
          <Image src="./svg/Logo.jpg" objectFit="contain"/>
          <HStack>
            <Button leftIcon={<LockIcon />} colorScheme='teal' variant='ghost'>
              Sign In
            </Button>
            <Button leftIcon={<PlusSquareIcon />} colorScheme='teal' variant='ghost'>
              Create Account
            </Button>
            <Button size='sm' onClick={toggleColorMode}>
              <SunIcon/>
            </Button>
          </HStack>
        </Flex>

    </Box>
  )
}
