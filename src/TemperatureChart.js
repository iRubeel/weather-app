import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TemperatureChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.time), // Assuming 'time' is a property in your data
    datasets: [
      {
        label: 'Temperature',
        data: data.map(item => item.temp),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default TemperatureChart;
