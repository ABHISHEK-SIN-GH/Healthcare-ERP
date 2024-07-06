import React from 'react';
import { Line } from 'react-chartjs-2';

const BedAvailabilityLineChart = () => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Beds Available',
        fill: false,
        borderColor: '#318CE7',
        borderWidth: 2,
        data: [32, 15, 10, 21, 12, 28, 32], // Sample data, replace with actual data
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Beds Available',
        },
      },
      x: {
        title: {
          display: false,
          text: 'Day',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Bed Availability Over Time',
        fontSize: 20,
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="col-span-12 xl:col-span-6">
      <Line data={data} options={options} />
    </div>
  );
};

export default BedAvailabilityLineChart;
