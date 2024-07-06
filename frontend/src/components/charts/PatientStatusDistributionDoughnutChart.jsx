import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const PatientStatusDistributionDoughnutChart = () => {
  // Sample data for patient status distribution in the hospital
  const statusData = {
    labels: ['Active', 'Discharged'],
    datasets: [
      {
        label: 'Patient Status Distribution',
        backgroundColor: [
          '#318CE7',
          '#6CB4EE',
        ],
        borderColor: [
          '#318CE7',
          '#6CB4EE',
        ],
        borderWidth: 1,
        data: [70, 30], // Sample data representing the percentage of patients in each status
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Patient Status Distribution',
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
      <Doughnut data={statusData} options={options} />
    </div>
  );
};

export default PatientStatusDistributionDoughnutChart;
