'use client'
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);



const DoughnutChart = ({accounts}:DoughnutChartProps) => {
    const data = {
        labels: [
            'Bank 1',
            'Bank 2',
            'Bank 3'
        ],
        datasets: [{
            label: 'Amount',
            data: [70, 50, 80],
            backgroundColor: [
                '#0747b6',
                '#0179FE',
                '#BED9FF',
            ],
            hoverOffset: 4
        }]

    };
    const options = {
        cutout: '60%',
        plugins: {
            legend: {
                display: false

            }

        }
    }
    return (
        <Doughnut data={data} options={options} />
    )
}

export default DoughnutChart
