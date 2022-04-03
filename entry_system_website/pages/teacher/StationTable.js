import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, List, ListItem, Table, Tbody, Text, Textarea, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import Layout from '../../components/React/Layout/Layout';
import HelperClass from '../../components/Helpers/HelperClass';
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/Firebase/Context/authUserContext';
import StationRowView from '../../components/React/View/StationRowItem';
import { useForm } from 'react-hook-form';

//updating the table layout to highlight the stationTable button.
let PageMenuItems = HelperClass.menuItems(false,false,true);

export default function StationView() {
    let [dispalyStationList, setDisplayStationList] = useState([]);
    let { acessStations, userData, createStation, createStationQrCodeFile } = useAuth();
    let [editMode, setEditMode] = useState(false);

    //form handler
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        if(acessStations){
            let tempArray = acessStations.map((element) => {
                //Using stationRow view component for each row in table
                return(<StationRowView 
                    key={element.id} 
                    data={element.data()} 
                    id={element.id} 
                    editMode={editMode}/>)
            })
            //settin the displaystation list state for component Rerender
            setDisplayStationList(tempArray)
        }
    }, [acessStations, editMode]) 
    //useEffect listens to changes in the available acesstations or edit mode


    function handleEditModeClick(){
        setEditMode((value) => !value);
    }


    /**
     * Invoked on add button click and uses useForm to acess data of entry with data object
     * @param  {object} data - Provides access to the form question of the stations name
    */
    async function handleStationAdd(data){
        try {
            //Creating station Firebase document using authCoontext function in Firestore
            //The datastorage 
            let station = await createStation(data.stationEntry,userData.school);
            console.log("id : " + station.id);
            //Uploading file to firebase storage for later acess through the station.id in
            //the row view
            let fileUpload = await createStationQrCodeFile(station.id);
        } catch (error) {
            console.log(error)
        }
    } 
    
    return(
        <Flex flexDir="column" justifyContent="space-evenly" alignItems="center" width="100%" >
            <Heading>Stations</Heading>
            <VStack>
                <Text>Station Directory</Text>
                <Table size="lg" fontSize="1.2em">
                    <Thead>
                        <Tr>
                            <Th>Station Name</Th>
                            <Th>Station Code</Th>
                            <Th>{editMode? "" : "File"}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dispalyStationList}
                    </Tbody>
                </Table>
                {editMode && 
                    <form onSubmit={handleSubmit(handleStationAdd)}>
                        <FormControl  m={1} isInvalid={errors.stationEntry}>
                            <FormLabel>Station Name</FormLabel>
                            <Input width="100%" placeholder='Enter Station Name' {...register("stationEntry", { required: {value: true ,message: "Please Enter Station Name"}})}/>
                            <FormErrorMessage>
                                {errors.stationEntry && errors.stationEntry.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Button colorScheme="teal" width="100%" type="submit" isLoading={isSubmitting}>Add Station</Button>
                    </form>
                }
                <Button fontWeight="bold" colorScheme="telegram" width="100%" onClick={handleEditModeClick}>{editMode? "Stop Edit": "Edit"}</Button>
            </VStack>
        </Flex>
    )
}





StationView.getLayout = function getLayout(pages) {
    return(
        <Layout menuItems={PageMenuItems}>
            {pages}
        </Layout>
    )
}