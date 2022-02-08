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


export default function UserProfile() {

    let {getUserExtraInformation} = useAuth();

    let [name, setName] = useState("Unkown");
    let [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        try {
            getUserExtraInformation().then((userData) => {
                setName(userData.first_name + " " + userData.last_name);
                setImgUrl(userData.img_url)
            })


        } catch (error) {
            console.log(error)
        }
    }, [])
    
    return (
        <Flex alignItems="center">
            <Avatar name={name} src={imgUrl} />
        </Flex>
    )
}