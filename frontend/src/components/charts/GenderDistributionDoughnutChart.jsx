import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const GenderDistributionDoughnutChart = () => {
  // Sample data for gender distribution among patients in the hospital
  const genderData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Gender Distribution',
        backgroundColor: [
          '#318CE7',
          '#6CB4EE',
        ],
        borderColor: [
          '#318CE7',
          '#6CB4EE',
        ],
        borderWidth: 1,
        data: [60, 40], // Sample data representing the percentage of male and female patients
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Gender Distribution Among Patients',
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
      <Doughnut data={genderData} options={options} />
    </div>
  );
};

export default GenderDistributionDoughnutChart;
