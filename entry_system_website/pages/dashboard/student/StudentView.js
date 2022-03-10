
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
        let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: {width: 250, height: 250} },
            /* verbose= */ false);
        html5QrcodeScanner.render(onScanSucess,onScanFailure);
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