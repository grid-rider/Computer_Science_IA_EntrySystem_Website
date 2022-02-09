import { Box, Text , Flex, Button, Hstack, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Heading, Icon, HStack, VStack} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/Firebase/Context/authUserContext";

import Layout from "../../components/React/Layout/Layout";


export default function SupervisorDashboard() {

    let {userData, user} = useAuth();
    let router = useRouter();

    let [menuSelector, setMenuSelector] = useState("graphAnalytics");

    if(userData){
        if(userData.role == "teacher"){
            return( 
                <Heading>Dashboard</Heading>

                );
        }else{
            return( <Text>Acess Denied </Text>);
        }
    } else {
        return( <Text>Acess Denied</Text>);
    }
}

SupervisorDashboard.getLayout = function getLayout(page) {
    return(
        <Layout>
            {page}
        </Layout>
    )
}