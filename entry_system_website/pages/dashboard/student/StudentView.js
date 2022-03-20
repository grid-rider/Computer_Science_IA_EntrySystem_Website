
    import { Box, Button, Flex, Heading, HStack, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react';
    import Layout from '../../../components/React/Layout/Layout';
    import menuItems from '../../../components/Helpers/StudentMenuItems';
    import { useEffect, useState } from 'react';
    import {Html5QrcodeScanner, Html5Qrcode} from "html5-qrcode";
    import { useAuth } from '../../../components/Firebase/Context/authUserContext';
    import UserProfile from '../../../components/React/Profile';


    const qrScannerConfig = {
        fps: 15,
    }

    let scanner;    

    export default function StudentView() {


        const { isOpen, onOpen, onClose} = useDisclosure();
        let [ scanOn, setScanOn] = useState(false);
        let [ entryType, setEntryType] = useState("loading...");
        let [ name, setName] = useState("loading...");


        //useAuth object destructuring 
        let { setBuildingTransfer,acessStations,updateStudentEntryStatus, user, userData} = useAuth();


        useEffect(() => {
            
            if(userData){
                if(userData.entry_status){
                    setEntryType("Signed In")
                }else{
                    setEntryType("Signed Out")

                }
                setName(userData.first_name + " " + userData.last_name)
            }
        }, [userData])



        function startQrCode () {

            scanner = new Html5Qrcode("reader");    
            Html5Qrcode.getCameras().then((devices) => {
                scanner.start({ facingMode: "environment" }, qrScannerConfig, onScanSucess, onScanFailure).catch((error) => {
                    console.log("failed to start scanner")
                    throw error 
                })
            }).catch((error) => {
                console.log("error occured with QR code scanner : " + error)
            })

        }


        //event listener functions for HTMLQRCode scanner
        function onScanSucess(decodedText, decodedResult){  
            scanner.pause(true);
            acessStations.forEach((doc) => {
                if(decodedText == doc.id) {
                    console.log("got here")
                    updateStudentEntryStatus(!userData.entry_status,user.uid).then(() => {
                        setBuildingTransfer((userData.entry_status? "entry":"exit"),decodedText).then(() => {
                            onOpen()
                            toggleScan()
                            return 0;
                        }).catch((error) => {
                            console.log(error);
                        })
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            });
            scanner.pause(false);
        }

        function onScanFailure(error) {
            console.log(error)
        }   

        function toggleScan(){
            if(!scanOn){
                setScanOn(value => !value)
                startQrCode()
            }else{
                scanner.stop().then(() => {
                    setScanOn(value => !value);
                })
            }
        }


        return(
            <>
                <Flex flexDir="column" justifyContent="space-evenly" alignItems="center">
                    <Flex flexDir="column" zIndex="0" justifyContent="center" alignItems="center" sx={{overflow: "hidden"}} position="relative" borderRadius="1000rem" border="solid 2px white" height={{base:"19em",md:"md"}} width={{base:"19em",md:"md"}}>
                        <Box id="reader" zIndex="-1" display={scanOn? "inline":"none"} width={{base:"33em",md:"xl"}} height={{base:"33em",md:"xl"}}></Box>
                        {scanOn?        
                            <Flex position="absolute" border="white 3px solid" p="7em" top="2em">
                                <Text>Scan Me</Text>
                            </Flex>   
                            :
                            <Flex flexDir="column" justifyContent="center" alignItems="center">
                                <UserProfile/>
                                <Text>{name}</Text>
                                <Heading position="relative">{entryType}</Heading>
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
                                <Text fontWeight="bold" fontSize="4xl">{entryType}</Text>
                                <Button onClick={onClose} marginLeft="auto" marginRight="auto">Complete</Button>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </>

        )   
    }

