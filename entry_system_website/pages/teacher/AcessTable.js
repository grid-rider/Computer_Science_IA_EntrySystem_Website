
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

    //Uses same approach as stationListener in the station page
    //However use effect only listens to changes in the firestore data
    //instead of having an edit mode
    //This can be attributed to the fact that the StudentRowView
    //Item uses a model instead of a rerender to edit edit entry status
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




//setting layout side bar tab using the global layout providefr
RowView.getLayout = function getLayout(pages) {
    return(
        <Layout menuItems={PageMenuItems}>
            {/**passing the menu items using the pageItems created with the helperClass*/}
            {pages}
        </Layout>
    )
}

