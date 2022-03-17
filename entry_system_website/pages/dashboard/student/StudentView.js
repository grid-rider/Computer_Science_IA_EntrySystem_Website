
import { Box, Button, Flex, Heading, HStack, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import menuItems from '../../../components/Helpers/StudentMenuItems';
import { useEffect, useState } from 'react';
import {Html5QrcodeScanner, Html5Qrcode} from "html5-qrcode";
import { useAuth } from '../../../components/Firebase/Context/authUserContext';

let PageMenuItems = menuItems(false,true);

const qrScannerConfig = {
    fps: 15
}

let scanner;    

export default function StudentView() {


    const { isOpen, onOpen, onClose} = useDisclosure();
    let [ scanOn, setScanOn] = useState(false);
    let [ entryType, setEntryType] = useState(false)


    //useAuth object destructuring 
    let { setBuildingTransfer,acessStations,updateStudentEntryStatus, user, userData} = useAuth();


    useEffect(() => {
        if(userData){
            setEntryType(userData.entry_type)
        }
    }, [userData])


    function startQrCode () {

        scanner = new Html5Qrcode("reader");    
        Html5Qrcode.getCameras().then((devices) => {
            if (devices && devices.length) {
                //finding camera id. For development purposes using first camera. In production selecting environment facing camera
                var cameraId = devices[0].id;
                scanner.start(cameraId, qrScannerConfig, onScanSucess, onScanFailure).catch((error) => {
                    console.log("failed to start scanner")
                    throw error 
                })
            }
        }).catch((error) => {
            console.log("error occured with QR code scanner : " + error)
        })

    }


    //event listener functions for HTMLQRCode scanner
    function onScanSucess(decodedText, decodedResult){  
        acessStations.forEach((doc) => {
            if(decodedText == doc.id) {
                scanner.stop().then(() => {
                    updateStudentEntryStatus(!userData.entry_status,user.uid).then(() => {
                        setBuildingTransfer((userData.entry_status? "entry":"exit"),decodedText).then(() => {
                            onOpen()
                        }).catch((error) => {
                            console.log(error);
                        })
                    }).catch((error) => {
                        console.log(error)
                    })
                }).catch((error) => {
                    throw error
                })

            }
        });
    }

    function onScanFailure(error) {
        console.log(error)
    }   

    function toggleScan(){
        setScanOn(value => !value);
        if(!scanOn){
            console.log("acessed")
            startQrCode()
        }else{
            console.log("error")
            scanner.stop().then(() => {
                console.log("completed")
            })
            
        }
    }


    return(
        <>
            <Flex flexDir="column" justifyContent="space-evenly" alignItems="center">
                <Box borderRadius="10000rem" border="solid 2px white" height="sm" width="sm" padding="4em" overflow="hidden">
                    <Box position="relative" width="xl" height="xl" id="reader" right="10em" bottom="6em"></Box>
                    {scanOn?
                        <>
                            <Box position="relative" zIndex="100" border="white 2px solid" p="4em">
                                <Text>Scan Me</Text>
                            </Box>   
                        </>
                    :
                        <Heading  position="relative"> Signed In </Heading>
                    }
                </Box>
                <Button onClick={toggleScan}>{!scanOn? "Start Scan" : "Stop Scan"}</Button>

            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent backgroundColor="green">
                    <ModalBody>
                        <Flex height="10em" justifyContent="space-between" alignItems="center" flexDir="column">
                            <Text fontWeight="medium">You have been:</Text>
                            <Text fontWeight="bold" fontSize="4xl">{(entryType? "Signed In":"Signed Out")}</Text>
                            <Button onClick={onClose} marginLeft="auto" marginRight="auto">Complete</Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>

    )
}

StudentView.getLayout = function getLayout(pages) {
    return(
        <Layout menuItems={PageMenuItems}>
            {pages}
        </Layout>
    )
}