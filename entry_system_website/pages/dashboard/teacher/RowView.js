
import { Flex, Heading } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import MenuItem  from '../../../components/Helpers/menuItemObject';


export default function RowView() {
    return(
        <Flex>
            <Heading> Row </Heading>
        </Flex>
    )
}

let menuItems = [
    MenuItem("Row View", "/dashboard/teacher/RowView", "table", true),
    MenuItem("Graph Analytics", "/dashboard/teacher/GraphAnalytics", "graph", false),
    MenuItem("Real Time View", "/dashboard/teacher/RealtimeView", "spyGlass", false),
];



RowView.getLayout = function getLayout(pages) {
    return(
        <Layout menuItems={menuItems}>
            {pages}
        </Layout>
    )
}