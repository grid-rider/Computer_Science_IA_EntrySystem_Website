
import { Box, Button, Flex, Heading, HStack, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import menuItems from '../../../components/Helpers/StudentMenuItems';
import { useEffect, useState } from 'react';
import {Html5QrcodeScanner, Html5Qrcode} from "html5-qrcode";
import { useAuth } from '../../../components/Firebase/Context/authUserContext';
import UserProfile from '../../../components/React/Profile';

let PageMenuItems = menuItems(false,true);

const qrScannerConfig = {
    fps: 15,
}

let scanner;    

export default function StudentView() {


    const { isOpen, onOpen, onClose} = useDisclosure();
    let [ scanOn, setScanOn] = useState(false);
    let [ entryType, setEntryType] = useState(false);
    let [ name, setName] = useState("loading...");


    //useAuth object destructuring 
    let { setBuildingTransfer,acessStations,updateStudentEntryStatus, user, userData} = useAuth();


    useEffect(() => {
        if(userData){
            setEntryType(userData.entry_type)
            setName(userData.first_name + " " + userData.last_name)
        }
    }, [userData])


    function startQrCode () {

        scanner = new Html5Qrcode("reader");    
        Html5Qrcode.getCameras().then((devices) => {
            if (devices && devices.length) {
                console.log("camera : ")
                console.log(devices[0])
                //finding camera id. For development purposes using first camera. In production selecting environment facing camera
                var cameraId = devices[0].id;
                scanner.start({ facingMode: "environment" }, qrScannerConfig, onScanSucess, onScanFailure).catch((error) => {
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
        if(!scanOn){
            console.log("acessed")
            startQrCode()
        }else{
            console.log("error")
            scanner.stop().then(() => {
                console.log("completed")
            })
            
        }
        setScanOn(value => !value);

    }


    return(
        <>
            <Flex flexDir="column" justifyContent="space-evenly" alignItems="center">
                <Flex flexDir="column" justifyContent="center" alignItems="center" sx={{overflow: "hidden"}} position="relative" borderRadius="1000rem" border="solid 2px white" height={{base:"19em",md:"md"}} width={{base:"19em",md:"md"}}>
                    <Box display={scanOn? "inline":"none"} position="absolute" zIndex="0" width={{base:"33em",md:"xl"}} height={{base:"33em",md:"xl"}} id="reader" top="0em"></Box>
                    {scanOn?        
                        <Flex position="absolute" zIndex="100" border="white 3px solid" p="7em" top="2em">
                            <Text>Scan Me</Text>
                        </Flex>   
                        :
                        <Flex flexDir="column" justifyContent="center" alignItems="center">
                            <UserProfile/>
                            <Text>{name}</Text>
                            <Heading position="relative">Status: {(entryType? "Signed In" : "Signed Out")}</Heading>
                        </Flex>
                    }
                </Flex>
                <Button colorScheme="teal" width="70%" height="3em" borderRadius="2em" marginTop="2em" onClick={toggleScan}>{!scanOn? "Start Scan" : "Stop Scan"}</Button>

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