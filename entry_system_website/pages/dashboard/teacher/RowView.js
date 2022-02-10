
import { Flex, Heading, List, ListItem, Text, VStack } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import menuItems from '../../../components/Helpers/TeacherMenuItems';
import { useEffect, useState } from 'react';
import {useAuth} from '../../../components/Firebase/Context/authUserContext';

let PageMenuItems = menuItems(false,true,false);

export default function RowView() {

    let [dispalyStudentList, setDisplayStudentLIst] = useState([]);
    let { studentList } = useAuth();

    useEffect(() => {
        let tempArray = studentList.map((element) => {
            let tempDocumentData = element.data()
            return(<ListItem key={element.id}><Text>{tempDocumentData.email}</Text></ListItem>)
        })
        setDisplayStudentLIst(tempArray)
    }, [studentList])

    
    return(
        <Flex flexDir="column" justifyContent="space-evenly">
            <Heading> Row View</Heading>
            <VStack>
                <Text>Student Directory</Text>
                <List>
                    {dispalyStudentList}
                </List>
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