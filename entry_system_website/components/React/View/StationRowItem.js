import { Avatar, Box, Flex, Image, Td, Tr, VStack, Text, Button , useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Select, ModalFooter, Center} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { useAuth } from "../../Firebase/Context/authUserContext";
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';


export default function StationRowView(props){

    let {deleteStation, getStationFileURL, userData, addStationURLFile} = useAuth();
    let [stationURL,setStationURL] = useState(null);
    let [loadButton, setLoadButton] = useState(true);


    useEffect(() => {
        handleStationFile()
        
    }, [userData])

    async function handleStationFile(){
        try {
            let href = await getStationFileURL(props.id);
            console.log(href)
            setStationURL(href);
         } catch (error) {
             console.log(error)
         }
    }

    async function handleStationRemove(){
        try {
            await deleteStation(props.id)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(stationURL){
            setLoadButton(false);
        }
    }, [stationURL]);

    return(
        <>
            <Tr> {/**Table row item */}
                <Td>
                    <Text>{props.data.name}</Text>
                </Td>

                <Td>
                    <Text>{props.id}</Text>
                </Td>           

                <Td>
                    {props.editMode? 
                        <Button variant="solid" onClick={handleStationRemove}>Remove</Button>
                    :
                        <Button variant="solid" as="a" href={props.data.file_url} target="_blank">File</Button>                
                    }
                </Td>
            </Tr>
        </>

    )
}   