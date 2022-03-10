
import { Flex, Heading } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import menuItems from '../../../components/Helpers/StudentMenuItems';
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';

let PageMenuItems = menuItems(false,true);

export default function StudentView() {

    const [data, setData] = useState('No result');

    function handleError(){

    }

    function handleScan(d){
        if (d) {
            setData(d);
        }
    }

    return(
        <Flex>
            <Heading> Analytics </Heading>
            <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            onResult={handleError}
            onLoad={"mirrorVideo"}
            showViewFinder= {true}
            style={{ width: '100px', height:"100px" }}
            />
            <div>
                {data}
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