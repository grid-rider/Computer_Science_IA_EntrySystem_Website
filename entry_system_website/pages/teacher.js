import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "../components/Firebase/Context/authUserContext";


export default function SupervisorDashboard() {

    let {userData, user} = useAuth();
    let router = useRouter();

    if(user){
        if(userData.role == "teacher"){
            return(
                <Box>
                    <Text>
                        Teacher Acess Granted
                    </Text>
                </Box>
            )
        } else {
            router.push("/")
        }
    } else {
        router.push("/")
    }
}