
import { Flex, Heading } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';

export default function StudentView() {
    return(
        <Flex>
            <Heading> Analytics </Heading>
        </Flex>
    )
}

StudentView.getLayout = function getLayout(pages) {
    return(
        <Layout>
            {pages}
        </Layout>
    )
}