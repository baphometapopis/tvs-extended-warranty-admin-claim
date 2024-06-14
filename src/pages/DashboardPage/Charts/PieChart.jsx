import React from 'react';
import ReactApexCharts from 'react-apexcharts';

export const DoughnutChart = ({ chartData }) => {
    if (!chartData) {
        return <div>Calculating stats please wait...</div>;
    }

    const doughnutChartData = {
        series: [
            chartData.approve_claim, 
            chartData.reject_claim, 
            chartData.pending_claim, 
            chartData.referBack_claim
        ],
        labels: [
            'Approved Claims', 
            'Rejected Claims', 
            'Pending Claims', 
            'Refer Back Claims'
        ],
    };

    const doughnutChartOptions = {
        labels: doughnutChartData.labels,
        colors: ['#1fe9b5', '#f55734', '#f9bc00', '#F89880'], // Different colors for each claim type
        legend: {
            show: false,
            // position: 'bottom',
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                },
            },
        },
    };

    return (
        <div>
            <ReactApexCharts
                options={doughnutChartOptions}
                series={doughnutChartData.series}
                type="donut"
                height={350}
            />
        </div>
    );
};

// Usage example:
// <DoughnutChart chartData={{
//     total_claim: 65,
//     approve_claim: 16,
//     reject_claim: 5,
//     pending_claim: 34,
//     referBack_claim: 10
// }} />
