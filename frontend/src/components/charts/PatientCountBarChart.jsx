import React from 'react';
import { Bar } from 'react-chartjs-2';

const PatientCountBarChart = () => {
  const data = {
    labels: ['Total Patients', 'OPD Patients', 'IPD Patients', 'New Admissions'],
    datasets: [
      {
        label: 'Number of Patients',
        backgroundColor: '#318CE7',
        borderColor: '#318CE7',
        borderWidth: 1,
        data: [35, 17, 18, 10], // Sample data, replace with actual data
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Patients',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Patient Count',
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

export default PatientCountBarChart;