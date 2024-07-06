import React from "react";
import DashboardCard from "../../components/cards/DashboardCard";
import PatientCountBarChart from "../../components/charts/PatientCountBarChart";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";

import PaymentBreakdownPieChart from "../../components/charts/PaymentBreakdownPieChart";
import PatientTypePieChart from "../../components/charts/PatientTypePieChart";
import BedAvailabilityLineChart from "../../components/charts/BedAvailabilityLineChart";
import StaffCountStackedBarChart from "../../components/charts/StaffCountStackedBarChart";
import MonthlySalesBarChart from "../../components/charts/MonthlySalesBarChart";
import PatientStatusDistributionDoughnutChart from "../../components/charts/PatientStatusDistributionDoughnutChart";
import GenderDistributionDoughnutChart from "../../components/charts/GenderDistributionDoughnutChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Dashboard() {
  const role = JSON.parse(localStorage.getItem("user")).role;
  const username = JSON.parse(localStorage.getItem("user")).username;
  return <>
    <h1 className='text-2xl font-bold text-start mb-6'>Dashboard</h1>
    <div className="grid grid-cols-12 gap-6">
      {
        (["admin"].includes(role) && username=="admin") ? 
        <>
        <DashboardCard name={"Invoice Amount"} value={"₹ 12000"} icon={<i class="fa-solid fa-file-invoice"></i>}/>
        <DashboardCard name={"Bill Amount"} value={"₹ 18000"} icon={<i class="fa-solid fa-receipt"></i>}/>
        <DashboardCard name={"Payment Amount"} value={"₹ 12000"} icon={<i class="fa-solid fa-money-bill"></i>}/>
        <DashboardCard name={"Advance Amount"} value={"₹ 10000"} icon={<i class="fa-solid fa-money-check"></i>}/>  
        </> : '' 
      }

      <DashboardCard name={"Total Patients"} value={"35"} icon={<i class="fa-solid fa-user-injured"></i>}/>
      <DashboardCard name={"OPD Patients"} value={"17"} icon={<i class="fa-solid fa-house-medical"></i>}/>
      <DashboardCard name={"IPD Patients"} value={"18"} icon={<i class="fa-solid fa-bed-pulse"></i>}/>
      <DashboardCard name={"Beds Available"} value={"32"} icon={<i class="fa-solid fa-bed"></i>}/>
      
      {
        (["admin"].includes(role) && username=="admin") ? 
        <>
          <DashboardCard name={"Doctors (On Duty)}"} value={"12"} icon={<i class="fa-solid fa-user-doctor"></i>}/>
          <DashboardCard name={"Nurses (On Duty)"} value={"18"} icon={<i class="fa-solid fa-user-nurse"></i>}/>
          <DashboardCard name={"New Admission"} value={"12"} icon={<i class="fa-solid fa-wheelchair"></i>}/>
          <DashboardCard name={"Discharge Patients"} value={"10"} icon={<i class="fa-solid fa-person-walking"></i>}/>
        </> : '' 
      }
      
      <hr className="col-span-12 my-12"/>

      <PatientCountBarChart/>

      {
        (["admin"].includes(role)) ? 
        <>
          <PaymentBreakdownPieChart/>
          <PatientTypePieChart/>
        </> : ''
      }  

      <BedAvailabilityLineChart/>

      {
        (["admin"].includes(role)) ? 
        <>
          <StaffCountStackedBarChart/>
          <MonthlySalesBarChart/>
          <PatientStatusDistributionDoughnutChart/>
          <GenderDistributionDoughnutChart/>
        </> : ''
      }  

    </div>
  </>;
}
