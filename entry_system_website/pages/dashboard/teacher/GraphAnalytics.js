
import { Box, Flex, Heading } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import menuItems from '../../../components/Helpers/TeacherMenuItems';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../components/Firebase/Context/authUserContext';

let PageMenuItems = menuItems(true,false,false);


export default function GraphAnalytics() {

    let [ log, setLog ] = useState([]);

    let { accessLog, user } = useAuth();

    useEffect(() => {
        if(user){
            console.log(accessLog);
            setLog(accessLog);
        }
    }, [accessLog])

    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
        }
    };


    useEffect(()=>{
        let chart = new Chart("graph",config);

        return(() => {
            chart.destroy();
        })

    },[])


    return(
        <Flex flexDir="column" justifyContent="center" alignItems="center" backgroundColor="gray.700" padding="2em" borderRadius="3rem">
            <Heading> Graph Analytics </Heading>
            <Box backgroundColor="white" marginTop="2em" width="43vw" height="fit-content" padding="1em" borderRadius="2rem">
                <canvas id="graph"/>
            </Box>
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