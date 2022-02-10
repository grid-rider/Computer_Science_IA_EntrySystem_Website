import { Avatar, Box, Flex, Image, Td, Tr, VStack } from '@chakra-ui/react';



export default function StudentRowView(props){
    let name = props.firstName + " " + props.lastName;

    return(
        <Tr>
            <Td>
                <Flex flexDir="row">
                    <Avatar name={name} src={props.src}/>
                    <VStack>
                        <Text>{name}</Text>
                        <Text>{props.email}</Text>
                    </VStack>
                </Flex>
            </Td>

            <Td>
                <Box backgroundColor={props.entryStatus ? "green" : "red"}>
                    <Text>{props.entryStatus ? "Present" : "Abscent"}</Text>
                </Box>
            </Td>   
        </Tr>
    )
}   