
import { Button, Flex, Heading, List, ListItem, Table, Tbody, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import menuItems from '../../../components/Helpers/TeacherMenuItems';
import { useEffect, useState } from 'react';
import {useAuth} from '../../../components/Firebase/Context/authUserContext';
import StudentRowView from '../../../components/React/View/StudentRowView';

let PageMenuItems = menuItems(false,true,false);

export default function RowView() {

    let [dispalyStudentList, setDisplayStudentLIst] = useState([]);
    let { studentList } = useAuth();

    useEffect(() => {
        let tempArray = studentList.map((element) => {
            return(<StudentRowView data={element.data()}/>)
        })
        setDisplayStudentLIst(tempArray)
    }, [studentList])

    
    return(
        <Flex flexDir="column" justifyContent="space-evenly" alignItems="center">
            <Heading> Row View</Heading>
            <VStack>
                <Text>Student Directory</Text>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>User</Th>
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