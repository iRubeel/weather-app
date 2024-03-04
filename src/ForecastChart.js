import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ForecastChart = ({ forecast }) => {
  const chartData = {
    labels: forecast.list.map(item => new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: forecast.list.map(item => item.main.temp),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ForecastChart;
