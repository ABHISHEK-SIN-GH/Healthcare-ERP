import React from 'react';
import { Bar } from 'react-chartjs-2';

const MonthlySalesBarChart = () => {
  // Sample sales data for 12 months
  const salesData = [15000, 18000, 20000, 17000, 19000, 22000, 25000, 23000, 21000, 19000, 18000, 20000];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Sales',
        backgroundColor: '#318CE7',
        borderColor: '#318CE7',
        borderWidth: 1,
        data: salesData,
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    scales: {
      x: {
        title: {
          display: true,
          text: 'Sales Amount ($)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Monthly Sales',
        fontSize: 20,
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="col-span-12 xl:col-span-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlySalesBarChart;