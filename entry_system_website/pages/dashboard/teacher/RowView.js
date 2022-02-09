
import { Flex, Heading } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';

export default function RowView() {
    return(
        <Flex>
            <Heading> Analytics </Heading>
        </Flex>
    )
}

RowView.getLayout = function getLayout(pages) {
    return(
        <Layout>
            {pages}
        </Layout>
    )
}