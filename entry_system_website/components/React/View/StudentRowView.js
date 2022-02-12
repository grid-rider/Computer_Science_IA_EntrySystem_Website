import { Avatar, Box, Flex, Image, Td, Tr, VStack, Text } from '@chakra-ui/react';



export default function StudentRowView(props){
    let name = props.data.first_name + " " + props.data.last_name;

    return(
        <Tr>
            <Td>
                <Flex flexDir="row">
                    <Avatar name={name} src={props.data.img_url}/>
                    <VStack>
                        <Text>{name}</Text>
                        <Text>{props.data.email}</Text>
                    </VStack>
                </Flex>
            </Td>

            <Td>
                <Box backgroundColor={props.data.entry_status ? "green" : "red"}>
                    <Text>{props.data.entry_status ? "Present" : "Abscent"}</Text>
                </Box>
            </Td>   

            <Td>
                <Text>{props.data.last_entry}</Text>
            </Td>

            <Td>
                <Text>{props.data.last_exit}</Text>
            </Td>
            
            <Td>
                <Text>edit</Text>
            </Td>
        </Tr>
    )
}   