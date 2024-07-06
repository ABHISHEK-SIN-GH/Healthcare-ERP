import React from 'react';
import { Bar } from 'react-chartjs-2';

const StaffCountStackedBarChart = () => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Doctors',
        backgroundColor: '#7CB9E8', // Monochromatic color
        data: [12, 12, 12, 13, 13, 12, 12], // Sample data for doctors, replace with actual data
      },
      {
        label: 'Nurses',
        backgroundColor: '#318CE7', // Monochromatic color with different opacity
        data: [18, 18, 18, 18, 19, 18, 18], // Sample data for nurses, replace with actual data
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Staff',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Day',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Staff Count (Doctors vs Nurses)',
        fontSize: 20,
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  return (
    <div  className="col-span-12 xl:col-span-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default StaffCountStackedBarChart;
