import { Box, Button, Flex, Heading, HStack, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Stat, StatHelpText, StatLabel, StatNumber, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {Html5QrcodeScanner, Html5Qrcode} from "html5-qrcode";
import { useAuth } from '../components/Firebase/Context/authUserContext.js';
import UserProfile from '../components/React/View/ProfileIcon.js';
import NavBar from '../components/React/View/NavBar.js';
import HelperClass from '../components/Helpers/HelperClass.js';


const qrScannerConfig = {
    fps: 15,
}

function getEntryObject(entry_date,exit_date){
    return({
        entry_date_string: HelperClass.getParsedDate(entry_date),
        entry_time_string: HelperClass.getParsedTime(entry_date),
        exit_date_string: HelperClass.getParsedDate(exit_date),
        exit_time_string: HelperClass.getParsedTime(exit_date),
    });
}

let scanner;    

export default function StudentView() {

    const { isOpen, onOpen, onClose} = useDisclosure();
    let [ scanOn, setScanOn] = useState(false);
    let [ entryType, setEntryType] = useState("loading...");
    let [ entryObject, setEntryObject] = useState(null);
    let [ name, setName] = useState("loading...");
    let [ loading, setLoading] = useState(true);


    //useAuth object destructuring 
    let { setBuildingTransfer,acessStations,updateStudentEntryStatus, user, userData} = useAuth();
 

    useEffect(() => {
        
        if(userData){
            setLoading(false);
            let entry_date =  userData.last_entry.toDate();
            let exit_date =  userData.last_exit.toDate();
            setEntryObject(getEntryObject(entry_date,exit_date));
            if(userData.entry_status){
                setEntryType("Signed In")
            }else{
                setEntryType("Signed Out")
            }
            setName(userData.first_name + " " + userData.last_name)
        }
    }, [userData])



    function startQrCode () {
        //instantiage Html5Qrcode object with id of component where rendered
        scanner = new Html5Qrcode("reader");    
        Html5Qrcode.getCameras().then((devices) => {
            //starting scanner facing environment
            scanner.start({ facingMode: "environment" }, qrScannerConfig, onScanSucess, onScanFailure)
            .catch((error) => {
                console.log("failed to start scanner")
                throw error 
            })
        }).catch((error) => {
            console.log("error occured with QR code scanner : " + error)
        })
    }


    //event listener functions for HTMLQRCode scanner
    function onScanSucess(decodedText, decodedResult){  
        scanner.pause(true); //pausing scanner to ensure no further sucessful scans
        acessStations.forEach((doc) => { 
            //iterating through acessStation array to check if code is valid
            if(decodedText == doc.id) {
                scanner.stop().then(() => {  //stopping scanner to ensure no further scanning
                    updateStudentEntryStatus(!userData.entry_status,user.uid).then(() => { 
                        //updating user entry status in user firestore document

                        //calling promise of userFirestore entry status change and acess log recordd
                        setBuildingTransfer((userData.entry_status? "entry":"exit"),decodedText).then(() => {
                            onOpen()
                            setScanOn(false);
                            return 0;
                        }).catch((error) => {
                            console.log(error);
                        })
                    }).catch((error) => {
                        console.log(error)
                    })
                })

            }
        });
        scanner.resume();
    }

    function onScanFailure(error) {
        console.log(error) //logging errors for development
    }           

    function toggleScan(){
        //changing scanning mode 
        if(!scanOn){
            setScanOn(true)
            startQrCode()
        }else{
            scanner.stop().then(() => {
                setScanOn(false);
            })
        }
    }

    if(loading){
        return(
            <Flex justifyContent="center" alignItems="center" w="100vw" h="100vh">
                <Box backgroundColor="teal.300" borderRadius="2rem" padding="2em"> 
                    <Heading>Error, Please Log In</Heading>
                    <Text as="a" fontSize="2em" href="/SignInPage" _hover={{borderBottom: "solid 2px white"}}>Login Here</Text>
                </Box>
            </Flex>
        )
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
                            <UserProfile/> {/**Component from custom ProfileIcon component */}
                            <Text>{name}</Text>
                            <Heading position="relative">{entryType}</Heading>
                        </Flex>
                    }
                </Flex>
                <Button colorScheme="teal" width={{base:"60vw",sm:"50vw",md:"15em"}} height="3em" borderRadius="2em" marginTop="2em" onClick={toggleScan}>{!scanOn? "Start Scan" : "Stop Scan"}</Button>
                <Flex flexDir="row" px="2em" py="0.5em" justifyContent="space-around" alignItems="center" backgroundColor="gray.200" height="fit-content" marginTop="4em" borderRadius="2rem" width="fit-content">
                    <Stat  maxW="10em" padding="0.8em" backgroundColor="purple.600"  boxShadow='xs' rounded='xl' bg='white' margin="0.5em" color="black">
                        <StatLabel fontWeight="bold" fontSize="1em">Last Entry:</StatLabel>
                        <StatNumber>{entryObject? entryObject.entry_date_string : "Loading"} </StatNumber>
                        <StatNumber>{entryObject? entryObject.entry_time_string : "Loading"}</StatNumber>
                    </Stat>
                    <Stat padding="0.8em" maxW="10em" backgroundColor="purple.600"  boxShadow='xs' rounded='xl' bg='white' margin="0.5em" color="black">
                        <StatLabel fontWeight="bold" fontSize="1em">Last Exit:</StatLabel>
                        <StatNumber>{entryObject? entryObject.exit_date_string : "Loading"}</StatNumber>
                        <StatNumber>{entryObject? entryObject.exit_time_string : "Loading"}</StatNumber>
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

