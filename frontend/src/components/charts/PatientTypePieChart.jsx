import React from 'react';
import { Pie } from 'react-chartjs-2';

const PatientTypePieChart = () => {
  const data = {
    labels: ['OPD Patients', 'IPD Patients'],
    datasets: [
      {
        label: 'Patient Type',
        backgroundColor: ['#318CE7', '#6CB4EE'],
        borderColor: ['#318CE7', '#6CB4EE'],
        borderWidth: 1,
        data: [45, 18], // Sample data, replace with actual data
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Patient Distribution',
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

export default PatientTypePieChart;