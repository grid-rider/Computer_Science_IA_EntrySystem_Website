import { useState } from 'react';
import { useEffect } from 'react';
import styles from '../../styles/Profile.module.css';
import { useAuth } from '../../Firebase/Context/authUserContext';
import {
    HStack,
    Flex,
    Text,
    Avatar
} from '@chakra-ui/react';

export default function UserProfile() {

    let {userData} = useAuth();
    
    let [name, setName] = useState("Unkown");
    let [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        if (userData) {
            setName(userData.first_name + " " + userData.last_name)
            setImgUrl(userData.img_url);
        }
    }, [userData])
    return (
        <Avatar name={name} src={imgUrl}  marginRight="1em"/>
    )
}