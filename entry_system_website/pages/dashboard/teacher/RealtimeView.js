
import { Flex, Heading } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import menuItems from '../../../components/Helpers/TeacherMenuItems';

let PageMenuItems = menuItems(false,false,true);

export default function RealtimeView() {
    return(
        <Flex>
            <Heading> Realtime </Heading>
        </Flex>
    )
}





RealtimeView.getLayout = function getLayout(pages) {
    return(
        <Layout menuItems={PageMenuItems}>
            {pages}
        </Layout>
    )
}