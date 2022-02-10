
import { Flex, Heading } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import menuItems from '../../../components/Helpers/TeacherMenuItems';

let PageMenuItems = menuItems(true,false,false);

export default function GraphAnalytics() {
    return(
        <Flex>
            <Heading> Graph </Heading>
        </Flex>
    )
}




GraphAnalytics.getLayout = function getLayout(pages) {
    return(
        <Layout menuItems={PageMenuItems}>
            {pages}
        </Layout>
    )
}