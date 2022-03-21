
import { Flex, Heading } from '@chakra-ui/react';
import Layout from '../../../components/React/Layout/Layout';
import menuItems from '../../../components/Helpers/TeacherMenuItems';
import Chart from 'chart.js/auto';
import { useEffect } from 'react';

let PageMenuItems = menuItems(true,false,false);


export default function GraphAnalytics() {

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

    },[])


    return(
        <Flex flexDir="column" backgroundColor="white">
            <Heading> Graph </Heading>
            <canvas id="graph"/>
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