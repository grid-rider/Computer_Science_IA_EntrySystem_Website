import { Box, Text , Flex, Button, Hstack, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Heading, Icon} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../components/Firebase/Context/authUserContext";
import { AiOutlineDingding } from 'react-icons/ai';


export default function SupervisorDashboard() {

    let {userData, user} = useAuth();
    let router = useRouter();


    if(userData){
        if(userData.role == "teacher"){
            return( 
                <Flex flexDirection="row">
                    <Flex flexDirection="column" width="15%" height="100vh" alignItems="center" justifyContent="space-between">
                        <Button width="100%"><Icon as={AiOutlineDingding}/></Button>
                        
                    </Flex>
                    <Flex flexDirection="column">
                        <Text>Table</Text>
                    </Flex>
                
                </Flex>

                );
        }else{
            return( <Text>Acess Denied </Text>);
        }
    } else {
        return( <Text>Acess Denied</Text>);
    }
}