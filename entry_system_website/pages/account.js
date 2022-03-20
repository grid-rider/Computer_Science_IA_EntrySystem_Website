import { Flex, Heading, Text} from '@chakra-ui/react';
import UserProfile from '../components/React/Profile';

export default function Account(){
    if(!user){
        return(<Text>Acess Denied: Please Log In</Text>)
    }

    return(
        <Flex flexDir="coloumn" alignItems="center">
            <UserProfile/>
        </Flex>
    )
}