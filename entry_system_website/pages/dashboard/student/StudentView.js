
import { Flex, Heading } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import menuItems from '../../../components/Helpers/StudentMenuItems';
import { useEffect, useState } from 'react';
import {Html5QrcodeScanner} from "html5-qrcode";
import {Html5Qrcode} from "html5-qrcode";

let PageMenuItems = menuItems(false,true);

export default function StudentView() {

    //event listener function for HTMLQRCode scanner
    function onScanSucess(decodedText, decodedResult){
        console.log(`Code matched = ${decodedText}`, decodedResult);
    }
    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`);
    }

    useEffect(() => {
        Html5Qrcode.getCameras().then((devices) => {
            if (devices && devices.length) {
                var cameraId = devices[0].id;
                const scanner = new Html5Qrcode("reader");
                scanner.start(cameraId, {fps: 10}, onScanSucess, onScanFailure).catch((error) => {
                    console.log("failed to start scanner")
                    throw error 
                })
            }
        }).catch((error) => {
            console.log("error occured with QR code scanner : " + error)
        })
    }, [])

    return(
        <Flex flexDir="column" justifyContent="space-between">
            <Heading> Analytics </Heading>
            <div id="reader">
            </div>
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