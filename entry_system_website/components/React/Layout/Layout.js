import { Box, Text , Flex, Button, Hstack, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Heading, Icon, HStack, VStack, useColorMode, List, ListItem} from "@chakra-ui/react";
import { AiOutlineDingding } from 'react-icons/ai';
import { VscGraphLine } from 'react-icons/vsc';
import { ViewIcon, SunIcon, HamburgerIcon, CloseIcon} from '@chakra-ui/icons';
import { BsQuestionSquare} from 'react-icons/bs';
import UserProfile from "../Profile";
import getIconFromType from '../../Helpers/iconTypes';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({children, menuItems}) {

    const { colorMode, toggleColorMode} = useColorMode();

    const { isOpen, onOpen, onClose } = useDisclosure()

    let router = useRouter();

    return(
        <>
            <Flex flexDirection="row" >
                <Box flexDirection="column" minWidth="sm" height="100vh" alignItems="center" justifyContent="space-between" display={{base: "none",xl:"flex"}}>
                    <Button width="80%" variant="ghost" borderBottom="1px" borderRadius="0" borderColor="gray.600" marginTop="1em" onClick={() => router.push("/")}><Icon width="30px" height="30px" as={AiOutlineDingding}/></Button>
                    <VStack>
                        <Heading fontWeight="bold" fontSize="1.5em">App Menu</Heading>
                        <List width="100%">
                            {menuItems.map(element => { 
                                return (
                                <ListItem key={element.title}>
                                    <Button width="100%" variant="ghost" onClick={() => router.push(element.href)} borderBottom="1px" borderRadius="0" borderColor="gray.600" marginTop="1em" leftIcon={getIconFromType(element.iconType)} backgroundColor={element.isActive && "teal.400"}>
                                        <Text>{element.title}</Text> 
                                    </Button>
                                </ListItem>
                                )
                            })}
                        </List>

                    </VStack>

                    <VStack backgroundColor="turquoise" borderRadius="0.5em" marginBottom="15em" height="6em" >  
                        <BsQuestionSquare/>
                        <Flex alignItems="center"flexDirection="column" justifyContent="center">
                            <Heading fontSize="1.5em">Need Help</Heading>
                            <Button   marginTop="0.5em" variant="outline" border="2px" borderColor="whiteAlpha.500">See Documentation</Button>
                        </Flex>
                    </VStack>
                </Box>
                <VStack width="100%">
                    <Flex flexDirection="row" justifyContent={{base:"center",md:"flex-end"}} alignItems="center" width="100%">
                        <UserProfile/>
                        <Button onClick={toggleColorMode} margin="2em">
                            <SunIcon/>
                        </Button>
                        <Button display={{xl:"none"}} marginRight="1em" variant="ghost" onClick={onOpen}><HamburgerIcon width="2em" height="2em"/></Button>
                    </Flex>
                    {children}
                </VStack>
            </Flex>

            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay/>
                <DrawerContent>

                    <DrawerHeader>
                        <Flex width="100%" justifyContent="flex-end">
                            <Button onClick={onClose} variant="ghost"><CloseIcon /></Button>
                        </Flex>
                    </DrawerHeader>

                    <DrawerBody>
                        <Text> Add content</Text>
                    </DrawerBody>

                </DrawerContent>
            </Drawer>


        </>

    )
}