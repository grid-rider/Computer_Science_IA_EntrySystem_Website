import { Avatar, Box, Flex, Image, Td, Tr, VStack, Text, Button , useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Select, ModalFooter, Center} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { useAuth } from "../../Firebase/Context/authUserContext";
import { Timestamp } from 'firebase/firestore';
import { useEffect } from 'react';


export default function StationRowView(props){

    let {deleteStation} = useAuth();

    function handleFileDownload(){

    }

    async function handleStationRemove(){
        try {
            await deleteStation(props.id)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(props.editMode)
    }, [props.editMode])

    return(
        <>
            <Tr>
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
                        <Button variant="solid" onClick={handleFileDownload}>File</Button>                
                    }
                </Td>
            </Tr>
        </>

    )
}   