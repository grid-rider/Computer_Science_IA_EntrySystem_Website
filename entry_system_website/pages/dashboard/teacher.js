import { Box, Text , Flex, Button, Hstack} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../components/Firebase/Context/authUserContext";


export default function SupervisorDashboard() {

    let {userData, user} = useAuth();
    let router = useRouter();

    if(userData){
        if(userData.role == "teacher"){
            return( 
                <Flex flexDirection="row">
                    <Flex flexDirection="column" width="20%" border='1px' borderColor='gray.200' position="absolute">
                        <Text>Nav</Text>
                    </Flex>

                    <Flex flexDirection="column" width="100%" border='1px' borderColor='gray.200'>
                        <Text>Nav</Text>
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