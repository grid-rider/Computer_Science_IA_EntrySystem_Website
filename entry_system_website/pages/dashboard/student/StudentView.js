
import { Flex, Heading } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import menuItems from '../../../components/Helpers/StudentMenuItems';

let PageMenuItems = menuItems(false,true);

export default function StudentView() {
    return(
        <Flex>
            <Heading> Analytics </Heading>
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