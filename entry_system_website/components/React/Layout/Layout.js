import { Text , Flex, Button, useDisclosure, Heading, VStack, useColorMode, List, ListItem} from "@chakra-ui/react";
import { QuestionOutlineIcon} from '@chakra-ui/icons';
import { useRouter } from "next/router";
import NavBar from "../View/NavBar";
import HelperClass from "../../Helpers/HelperClass";
/**
 * Description: This component is used by the layout provider to provide navigation to the teacher section pages.
 * Note: The properties (children and menuItems) in this function are destructured to gain quicker access
 * @param  {} {children 
 * @param  {} menuItems}
 */
export default function Layout({children, menuItems}) {

    //useRouter hook used to navigate between pages
    let router = useRouter();

    return(
        <>
            <Flex flexDirection="column" >
                <NavBar/>
                <Flex flexDirection="row">
                    <Flex height="80vh" borderTop="gray 2px solid" paddingTop="0.5em" flexDirection="column" width="fit-content" marginLeft="1.2em" alignItems="center" justifyContent="space-between" display={{base: "none",xl:"flex"}}>
                        <VStack>
                            <Heading fontWeight="bold" fontSize="1.5em">App Menu</Heading>
                            <List width="100%">
                                {menuItems.map(element => { 
                                    return (
                                    <ListItem key={element.title}>
                                        <Button width="100%" variant="ghost" onClick={() => router.push(element.href)} borderBottom="1px" borderRadius="1rem" borderColor="gray.600" marginTop="1em" leftIcon={HelperClass.getIconFromType(element.iconType)} backgroundColor={element.isActive && "teal.400"}>
                                            <Text>{element.title}</Text> 
                                        </Button>
                                    </ListItem>
                                    )
                                })}
                            </List>
                        </VStack>

                        <VStack backgroundColor="turquoise" borderRadius="0.5em" marginBottom="15em" height="fit-content" >  
                            <QuestionOutlineIcon width="1.5em" height="1.5em" marginTop="0.5em"/>
                            <Flex alignItems="center"flexDirection="column" justifyContent="center">
                                <Heading fontSize="1.5em">Need Help</Heading>
                                <Button colorScheme="blue" margin="0.5em" variant="solid" as="a" target="blank" href="https://github.com/grid-rider/Computer_Science_IA_EntrySystem_Website.git">See Documentation</Button>
                            </Flex>
                        </VStack>
                    </Flex>
                    <VStack width="100%">
                        {children}
                    </VStack>
                </Flex>

            </Flex>
        </>

    )
}