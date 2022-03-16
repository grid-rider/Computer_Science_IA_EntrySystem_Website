
import { Box, Button, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import menuItems from '../../../components/Helpers/StudentMenuItems';
import { useEffect, useState } from 'react';
import {Html5QrcodeScanner, Html5Qrcode} from "html5-qrcode";
import { useAuth } from '../../../components/Firebase/Context/authUserContext';

let PageMenuItems = menuItems(false,true);

const qrScannerConfig = {
    fps: 15
}


export default function StudentView() {




    //useAuth object destructuring 
    let { setBuildingTransfer,acessStations,updateStudentEntryStatus, user, userData} = useAuth();

    let scanner;
    
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
                updateStudentEntryStatus(!userData.entry_status,user.uid).then(() => {
                    setBuildingTransfer((userData.entry_status? "exit":"entry"),decodedText).then(() => {
                        console.log("got here 2")
                        scanner.stop().catch((error) => {
                            throw error
                        })
                    }).catch((error) => {
                        console.log(error);
                    })
                }).catch((error) => {
                    console.log(error)
                })
            }
        });
    }

    function onScanFailure(error) {
    }   

    return(
        <Flex flexDir="column" justifyContent="space-between" align="center">
            <Heading> Scan </Heading>  
            <HStack>
                <Box position="relative" left="6em" zIndex="100" border="white 2px solid" p="4em">
                    <Text>Scan Me</Text>
                </Box>
                <Box width="17em" id="reader"></Box>
                <Button onClick={startQrCode}></Button>
            </HStack>

        </Flex>
    )
}

StudentView.getLayout = function getLayout(pages) {
    return(
        <Layout menuItems={PageMenuItems}>
            {pages}
        </Layout>
    )
}