import { Avatar, Button, ButtonGroup, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Firebase/Context/authUserContext";


export function editStudentModel({ isOpen, onOpen, onClose, uid, avatarIcon }) {

    let {updateStudentInformation} = useAuth();


    //form handler
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();


    function saveButtonHandler(data){
        updateStudentInformation("entry").then(() => {
            onClose()
        })
    }
    return(
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Edit Student</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Flex alignContent="space-between">
                        <Avatar src={avatarIcon}/>
                        <Flex >
                            <form onSubmit={handleSubmit(saveButtonHandler)}>
                                <FormControl m={1}>
                                    <FormLabel>Occupation</FormLabel>
                                    <Select {...register("role")}>
                                        <option value="teacher">Teacher</option>
                                        <option value="student">Student</option>
                                    </Select>
                                </FormControl>
                            </form>
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={saveButtonHandler} colorScheme="tiel">Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}