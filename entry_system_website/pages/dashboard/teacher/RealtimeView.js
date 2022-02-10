
import { Flex, Heading } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import MenuItem  from '../../../components/Helpers/menuItemObject';


export default function RealtimeView() {
    return(
        <Flex>
            <Heading> Realtime </Heading>
        </Flex>
    )
}

let menuItems = [
    MenuItem("Row View", "/dashboard/teacher/RowView", "table", false),
    MenuItem("Graph Analytics", "/dashboard/teacher/GraphAnalytics", "graph", false),
    MenuItem("Real Time View", "/dashboard/teacher/RealtimeView", "spyGlass", true),
];



RealtimeView.getLayout = function getLayout(pages) {
    return(
        <Layout menuItems={menuItems}>
            {pages}
        </Layout>
    )
}