import { Avatar, Box, Flex, Image, Td, Tr, VStack, Text, Button , useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Select, ModalFooter, Center} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { useAuth } from "../../Firebase/Context/authUserContext";
import { Timestamp } from 'firebase/firestore';


function getParsedDate(date){
    return(date.getDay() + "." + date.getMonth() +"." + date.getFullYear());
}

function getParsedTime(date){
    return(date.getMinutes() + ":" + date.getHours());
}


export default function StudentRowView(props){

    let entry_date =  new Date(props.data.last_entry.seconds*1000 + props.data.last_entry.nanoseconds/100000);
    let exit_date = new Date(props.data.last_exit.seconds*1000 + props.data.last_exit.nanoseconds/100000);
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    let {updateStudentEntryStatus} = useAuth();
    
    //form handler
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    function saveButtonHandler(data){
        updateStudentEntryStatus(data.status,props.id).then(() => {
            onClose()
        }).catch((error) => {
            console.log(error)
        })
    }

    let name = props.data.first_name + " " + props.data.last_name;


    return(
        <>
            <Tr>
                <Td>
                    <Avatar name={name} src={props.data.img_url}/>
                </Td>

                <Td>
                    <VStack>
                        <Text>{name}</Text>
                        <Text>{props.data.email}</Text>
                    </VStack>
                </Td>

                <Td>
                    <Text>{props.data.role}</Text>
                </Td>

                <Td>
                    <Box backgroundColor={props.data.entry_status ? "green" : "red"} borderRadius="2rem" padding="0.5em">
                        <Text>{props.data.entry_status ? "Present" : "Absent"}</Text>
                    </Box>
                </Td>   



                <Td>
                    <VStack>
                        <Text>{getParsedDate(entry_date)}</Text>
                        <Text>{getParsedTime(entry_date)}</Text>
                    </VStack>
                </Td>

                <Td>
                    <VStack>
                        <Text>{getParsedDate(exit_date)}</Text>
                        <Text>{getParsedTime(exit_date)}</Text>
                    </VStack>
                </Td>
                
                <Td>
                    <Button variant="link" onClick={onOpen}>edit</Button>
                </Td>
            </Tr>

            <Modal onClose={onClose} isOpen={isOpen}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Edit Student</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Flex alignContent="space-between">
                            <Avatar src={props.data.img_url}/>
                            <Flex >
                                <form onSubmit={handleSubmit(saveButtonHandler)}>
                                    <FormControl m={1}>
                                        <FormLabel>Presence</FormLabel>
                                        <Select {...register("status")}>
                                            <option value="true">Present</option>
                                            <option value="false">Absent</option>
                                        </Select>
                                    </FormControl>
                                    <Button width="100%" colorScheme="teal" type='submit' isLoading={isSubmitting}>Save</Button>
                                </form>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>

    )
}   