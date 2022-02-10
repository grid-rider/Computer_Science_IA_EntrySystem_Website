
import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import menuItems from '../../../components/Helpers/TeacherMenuItems';

let PageMenuItems = menuItems(false,true,false);

export default function RowView() {

    
    
    return(
        <Flex flexDir="column">
            <Heading> Row View</Heading>
            <VStack>
                <Text>Student Directory</Text>
            </VStack>
        </Flex>
    )
}





RowView.getLayout = function getLayout(pages) {
    return(
        <Layout menuItems={PageMenuItems}>
            {pages}
        </Layout>
    )
}