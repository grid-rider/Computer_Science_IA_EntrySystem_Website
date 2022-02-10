
import { Flex, Heading } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import MenuItem  from '../../../components/Helpers/menuItemObject';


export default function GraphAnalytics() {
    return(
        <Flex>
            <Heading> Graph </Heading>
        </Flex>
    )
}

let menuItems = [
    MenuItem("Row View", "/dashboard/teacher/RowView", "table", false),
    MenuItem("Graph Analytics", "/dashboard/teacher/GraphAnalytics", "graph", true),
    MenuItem("Real Time View", "/dashboard/teacher/RealtimeView", "spyGlass", false),
];



GraphAnalytics.getLayout = function getLayout(pages) {
    return(
        <Layout menuItems={menuItems}>
            {pages}
        </Layout>
    )
}