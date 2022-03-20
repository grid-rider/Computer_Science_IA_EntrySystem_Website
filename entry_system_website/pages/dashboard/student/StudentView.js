
import { Box, Button, Flex, Heading, HStack, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Stat, StatHelpText, StatLabel, StatNumber, Text, useDisclosure, VStack } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import menuItems from '../../../components/Helpers/StudentMenuItems';
import { useEffect, useState } from 'react';
import {Html5QrcodeScanner, Html5Qrcode} from "html5-qrcode";
import { useAuth } from '../../../components/Firebase/Context/authUserContext';
import UserProfile from '../../../components/React/Profile';
import NavBar from '../../../components/React/View/NavBar';


const qrScannerConfig = {
    fps: 15,
}


function getParsedDate(date){
    return(date.getDay() + "." + date.getMonth() +"." + date.getFullYear());
}

function getParsedTime(date){
    return(date.getMinutes() + ":" + date.getHours());
}

let scanner;    

export default function StudentView() {




    const { isOpen, onOpen, onClose} = useDisclosure();
    let [ scanOn, setScanOn] = useState(false);
    let [ entryType, setEntryType] = useState("loading...");
    let [ entryObject, setEntryObject] = useState(null);
    let [ name, setName] = useState("loading...");


    //useAuth object destructuring 
    let { setBuildingTransfer,acessStations,updateStudentEntryStatus, user, userData} = useAuth();


    useEffect(() => {
        
        if(userData){
            let entry_date =  new Date(userData.last_entry.seconds*1000 + userData.last_entry.nanoseconds/100000);
            let exit_date = new Date(userData.last_exit.seconds*1000 + userData.last_exit.nanoseconds/100000);
            setEntryObject({
                entry_date_string: getParsedDate(entry_date),
                entry_time_string: getParsedTime(entry_date),
                exit_date_string: getParsedDate(exit_date),
                exit_time_string: getParsedTime(exit_date),
            });
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
            <NavBar/>
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
                <Button colorScheme="teal" width={{base:"60vw",sm:"50vw",md:"15em"}} height="3em" borderRadius="2em" marginTop="2em" onClick={toggleScan}>{!scanOn? "Start Scan" : "Stop Scan"}</Button>
                <Flex fledDir="row" justifyContent="space-around" alignItems="center" backgroundColor="gray.200" width="90vw" height="6em" marginTop="4em" borderRadius="2rem">
                <Stat padding="0.5em" width="0.5em" backgroundColor="purple.600"  boxShadow='xs' rounded='xl' bg='white' margin="0.5em" color="black">
                        <StatLabel fontWeight="bold" fontSize="1em">Last Entry</StatLabel>
                        <StatNumber>{entryObject? entryObject.entry_date_string : "Loading"}, {entryObject? entryObject.entry_time_string : "Loading"}</StatNumber>
                    </Stat>
                    <Stat padding="0.5em" width="0.5em" backgroundColor="purple.600"  boxShadow='xs' rounded='xl' bg='white' margin="0.5em" color="black">
                        <StatLabel fontWeight="bold" fontSize="1em">Last Entry</StatLabel>
                        <StatNumber>{entryObject? entryObject.entry_date_string : "Loading"}, {entryObject? entryObject.entry_time_string : "Loading"}</StatNumber>
                    </Stat> 
                </Flex>

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

