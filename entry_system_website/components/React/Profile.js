import { useState } from 'react';
import { useEffect } from 'react';
import styles from '../../styles/Profile.module.css';
import { useAuth } from '../Firebase/Context/authUserContext';
import {
    HStack,
    Flex,
    Text,
    Avatar
} from '@chakra-ui/react';


export default function UserProfile(props) {

    let {user} = useAuth();

    let [ userIcon, setUserIcon] = useState("");
    let [ name, setName] = useState("");
    let [ email, setEmail ] = useState("");

    useEffect(() => {
        if(user) {

        }
    }, [user])
    
    return (
        <Flex alignItems="center">
            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
        </Flex>
    )
}