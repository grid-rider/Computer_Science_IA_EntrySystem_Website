import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useAuth } from '../components/Firebase/Context/authUserContext'
import { useEffect } from 'react'
import { AspectRatio, Box, Center, Container, Flex, Image, useColorMode ,Button, IconButton, HStack} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';



export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()

  let { user, Firebase_signOut , signIn} = useAuth();

  return (
    <Container>
      <Center>
        <Flex>
          <Image src="svg/Logo.jpg" objectFit="contain"/>
          <HStack>
            <Button leftIcon={<PlusSquareIcon/>}  colorScheme='teal' variant="solid">
              Sign Up
            </Button>


          </HStack>
        </Flex>

        <section>
          <div className={styles.Lock}></div>
          <div className={styles.BottomLeftPeople}></div>
        </section>
      </Center>
    </Container>
  )
}
