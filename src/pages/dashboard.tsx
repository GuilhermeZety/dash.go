import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import Head from "next/head";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
})

const options: ApexOptions ={
    chart: {
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        },
        foreColor: theme.colors.gray[500],
    },
    grid: {
        show: false
    },
    dataLabels: {
        offsetY: -5,
        background: {
            borderColor: '#00000000',
            dropShadow: {
                color: '#00000000'
            }
        },
        style: {   
            fontSize: '10px',         
            colors: ['#00000000'],
            fontFamily: 'Roboto'  
        }
    },
    tooltip: {
        enabled: false
    },
    xaxis: {
        type: 'datetime',
        axisBorder: {
            color: theme.colors.gray[600]
        },
        axisTicks: {
            color: theme.colors.gray[600]
        },
        categories: [
            '2022-03-03T00:00:00.000Z',
            '2022-03-04T00:00:00.000Z',
            '2022-03-05T00:00:00.000Z',
            '2022-03-06T00:00:00.000Z',
            '2022-03-07T00:00:00.000Z',
            '2022-03-08T00:00:00.000Z',
            '2022-03-09T00:00:00.000Z',
        ]
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.2,
        }
    },
    colors: [theme.colors.pink[500]]
}

const series = [
    {
        name: 'subscribe',
        data: [50, 210, 200, 550, 280, 1000, 202]
    }
]

export default function Dashboard() {
    return (
        <Flex direction='column' h='100vh'>
            <Head>
                <title>Dashboard | dashgo</title>
            </Head>
            
            <Header />

            <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
                <Sidebar />

                <SimpleGrid flex='1' gap='4' minChildWidth={320} alignItems='flex-start'>
                    <Box p={['6','8']} bg='gray.800' borderRadius={8} pb='4'>
                        <Text fontSize='large' mb='4'>Inscritos da semana</Text>
                        <Chart width='100%' options={options} series={series} type="area" height={160} />
                    </Box>

                    <Box p={['6','8']} bg='gray.800' borderRadius={8} pb='4'>
                        <Text fontSize='large' mb='4'>Taxa de abertura</Text>
                        <Chart width='100%' options={options} series={series} type="area" height={160} />
                    </Box>
                </SimpleGrid>
            </Flex>
        </Flex>
    )
}