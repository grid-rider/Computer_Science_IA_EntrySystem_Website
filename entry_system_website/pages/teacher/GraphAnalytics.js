
import { Box, Flex, Heading , Text} from '@chakra-ui/react';
import Layout from '../../components/React/Layout/Layout';
import HelperClass from '../../components/Helpers/HelperClass';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/Firebase/Context/authUserContext';

let PageMenuItems = HelperClass.menuItems(true,false,false);

function getGraphValueObject(date){
    return({
        x: date.getHours(),
        y: date.getMinutes(),
    })
}

export default function GraphAnalytics() {
 
    //This graph page will dispay no values if theere have been no entries on the current date
    //To see values please perform and entry or exit

    let [ accessGraphValues, setAccessGraphValues ] = useState([]);
    let [ exitGraphValues, setExitGraphValues ] = useState([]);
    let { accessLog } = useAuth();

    

    //data point object used for Graphing
    const data = {
        datasets: [{
            label: 'User Entries',
            backgroundColor:"rgba(245, 40, 145, 0.8)",
            pointBackgroundColor:"rgba(245, 40, 145, 0.8)",
            data: accessGraphValues,
        },{
            label: 'User Exits',
            backgroundColor:"rgba(64, 144, 255, 0.8)",
            pointBackgroundColor:"rgba(64, 144, 255, 0.8)",
            data: exitGraphValues,
        }]
    };


    //General confic for data graph 
    const config = {
        spanGaps: 1000 * 60 * 60 * 24 * 1, // 1 day
        type: 'scatter',
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                    //Sets scale to 24 Hour scale
                    min: 0,
                    max: 24, 
                    ticks: {
                        stepSize: 1,
                    },
                    display:true,
                    title: {
                        display: true,
                        text: 'Hour of Current Day',
                        color: '#008080',
                        font: {
                          size: 15,
                          weight: 'bold',
                          lineHeight: 1.2,
                        },
                        padding: {top: 5, left: 0, right: 0, bottom: 0}
                    }
                },
                y: {
                    //Sets scale to 60 minute scale
                    min: 0,
                    max: 60, 
                    ticks: {
                        stepSize: 1,
                    },
                    title: {
                        display: true,
                        text: 'Minutes of Respective Hour',
                        color: '#008080',
                        font: {
                          size: 15,
                          weight: 'bold',
                          lineHeight: 1.2,
                        },
                        padding: {top: 10, left: 0, right: 0, bottom: 0}
                    }
                }
            },
            pointBackgroundColor: ['rgba(245, 40, 145, 0.8)','black','black','black'],
        }
    };
    
    


    //Updating data for graph 
    useEffect(() => {
        if(accessLog){
            console.log(accessLog);
            let temp_entryArray = [];
            let temp_exitArray = [];
            //accesing 2D array acess log 
            accessLog.forEach(element => {
                /**
                 * acessing index 1 in 2D acess log array with following schema:
                 * [[log_id, {AcessLog Object (see schema in Criterion B)}], [log_id, {AcessLog Object}], .....]
                 * For acesslog schema see criterion B
                 * */ 
                let entryObject = element[1];

                let Access_date = new Date(entryObject.timestamp.seconds*1000 + entryObject.timestamp.nanoseconds/100000);
                let timeNow = new Date();

                if(entryObject.acess_type == "entry"){
                    //FIltering through acess log and checking if date is current date. 
                    if(Access_date.getDate() == timeNow.getDate() && Access_date.getMonth() == timeNow.getMonth() && Access_date.getFullYear() == timeNow.getFullYear()){
                        temp_entryArray.push(getGraphValueObject(Access_date))
                    } else {
                        return; 
                    }
                } else if(entryObject.acess_type == "exit"){
                    //FIltering through acess log and checking if date is current date. 
                    if(Access_date.getDate() == timeNow.getDate() && Access_date.getMonth() == timeNow.getMonth() && Access_date.getFullYear() == timeNow.getFullYear()){
                        temp_exitArray.push(getGraphValueObject(Access_date))
                    } else {
                        return; 
                    }
                }
            });
            //Acess and Exit state variables are set to rerender graph
            setAccessGraphValues(temp_entryArray);
            setExitGraphValues(temp_exitArray);
            console.log(accessGraphValues);
        }
    }, [accessLog]) //Invoked when changes in acessLog are detected


    //updating graph
    useEffect(()=>{
        let chart = new Chart("graph",config);
        chart.update(); //Update chart 
        return(() => { //This is invoked when component is unmounted and avoids uncessary resource usage 
            chart.destroy();
        })
    },[accessGraphValues, exitGraphValues]) //Called when changes in graph values are detected


    return(
        <Flex flexDir="column" justifyContent="center" alignItems="center" backgroundColor="gray.700" padding="2em" borderRadius="3rem">
            <Heading> Graph Analytics </Heading>
            <Box backgroundColor="white" marginTop="2em" width="43vw" height="fit-content" padding="1em" borderRadius="2rem">
                <canvas id="graph"/>
            </Box>
            <Text fontSize='sm' color='tomato' as="i">Please Note: this page reflects values of the current day. <br/>Therefore if no entries/exits have been made today the graph above will be blank</Text>
        </Flex>
    )
}




GraphAnalytics.getLayout = function getLayout(pages) {
    return(
        <Layout menuItems={PageMenuItems}>
            {pages}
        </Layout>
    )
}