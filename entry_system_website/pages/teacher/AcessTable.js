
import { Button, Flex, Heading, List, ListItem, Table, Tbody, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import Layout from '../../components/React/Layout/Layout';
import HelperClass from '../../components/Helpers/HelperClass';
import { useEffect, useState } from 'react';
import {useAuth} from '../../components/Firebase/Context/authUserContext';
import StudentRowView from '../../components/React/View/AccessRowItem';

let PageMenuItems = HelperClass.menuItems(false,true,false);

export default function RowView() {

    let [dispalyStudentList, setDisplayStudentLIst] = useState([]);
    let { studentList } = useAuth();

    useEffect(() => {
        let tempArray = studentList.map((element) => {
            return(<StudentRowView key={element.id} data={element.data()} id={element.id}/>)
        })
        setDisplayStudentLIst(tempArray)
    }, [studentList])

    
    return(
        <Flex flexDir="column" justifyContent="space-evenly" alignItems="center" width="100%" >
            <Heading> Row View</Heading>
            <VStack>
                <Text>Student Directory</Text>
                <Table size="lg" fontSize="1.2em">
                    <Thead>
                        <Tr>
                            <Th>Student Image</Th>
                            <Th>Name</Th>
                            <Th>Role</Th>
                            <Th>Status</Th>
                            <Th>Last Entry</Th>
                            <Th>Last Leave</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dispalyStudentList}
                    </Tbody>
                </Table>
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