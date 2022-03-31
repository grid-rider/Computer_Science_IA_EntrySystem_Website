import { AspectRatio, Box, Menu, MenuItem, Center, Container, Flex, Image, useColorMode ,Button, IconButton, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, MenuButton, MenuList, Heading, Text} from '@chakra-ui/react';
import { LockIcon, PlusSquareIcon, SunIcon , UnlockIcon} from '@chakra-ui/icons';
import UserProfile from './ProfileIcon.js';
import {FaUserCircle} from "react-icons/fa";
import { HamburgerIcon } from '@chakra-ui/icons';
import { useAuth } from '../../Firebase/Context/authUserContext';
import { MdAccountCircle } from "react-icons/md";

export default function NavBar(){
    const { colorMode, toggleColorMode } = useColorMode();
    let { user, Firebase_signOut} = useAuth();

    return(
        <Flex flexDir="row" justifyContent="space-between" alignItems="center" padding="1em" width="100vw" marginBottom="2em">
            <HStack  as="a" href="/">
                <svg
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                    fillRule="evenodd"
                    clipRule="evenodd"
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
                        <UserProfile/>
                        <Button as="a" href="/account" leftIcon={<MdAccountCircle size={28} />} colorScheme='teal' variant='ghost'>
                        Account
                        </Button>
                        <Button leftIcon={<UnlockIcon />} onClick={Firebase_signOut} colorScheme='teal' variant='ghost'>
                        Sign Out
                        </Button>
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
                <Button onClick={toggleColorMode} variant="ghost">
                    <SunIcon width="1.2em"  height="1.2em"/>
                </Button>
            </HStack>


        </Flex>
    )
}