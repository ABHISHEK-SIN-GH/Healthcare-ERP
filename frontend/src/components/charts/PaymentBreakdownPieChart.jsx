import React from 'react';
import { Pie } from 'react-chartjs-2';

const PaymentBreakdownPieChart = () => {
  const data = {
    labels: ['Invoice', 'Bill', 'Payment', 'Advance'],
    datasets: [
      {
        label: 'Payment Breakdown',
        backgroundColor: ['#318CE7', '#6CB4EE', '#89CFF0', '#B9D9EB'],
        borderColor: ['#318CE7', '#6CB4EE', '#89CFF0', '#B9D9EB'],
        borderWidth: 1,
        data: [12000, 18000, 12000, 10000], // Sample data, replace with actual data
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Payment Breakdown',
        fontSize: 20,
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  return (
    <div className="col-span-12 md:col-span-6 xl:col-span-3">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PaymentBreakdownPieChart;