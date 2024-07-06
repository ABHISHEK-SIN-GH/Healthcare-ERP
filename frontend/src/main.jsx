import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import Auth from './pages/Auth.jsx'
import IPD from "./pages/ipd/IPD";
import OPD from "./pages/opd/OPD";
import Account from "./pages/accounts/Account";
import Inventory from "./pages/inventory/Inventory";
import HRMS from "./pages/hrms/HRMS";
import POS from "./pages/pos/POS";
import Diagnosis from "./pages/diagnosis/Diagnosis";
import FrontDesk from "./pages/frontdesk/FrontDesk";

import Panel from './components/panels/Panel.jsx'

import PrintPage from './components/media_utils/PrintPage.jsx'
import CapUp from './components/media_utils/CapUp.jsx'

import PatientRegistration from './pages/registration/PatientRegistration.jsx'
import AllPatients from './pages/patients/AllPatients.jsx'
import PatientDetails from './pages/patients/PatientDetails.jsx'
import PatientDetails404 from './pages/patients/PatientDetails404.jsx'
import PatientVitalSigns from './pages/patients/PatientVitalSigns.jsx'
import PatientTreatmentPlan from './pages/patients/PatientTreatmentPlan.jsx'
import PatientCurrentMedications from './pages/patients/PatientCurrentMedications.jsx'
import PatientAppointmentsHistory from './pages/patients/PatientAppointmentsHistory.jsx'
import PatientNotes from './pages/patients/PatientNotes.jsx'
import Doctors from './pages/doctors/Doctors.jsx'
import Nurses from './pages/nurses/Nurses.jsx'
import Pharmacist from './pages/pharmacist/Pharmacist.jsx'
import Receptionists from './pages/receptionists/Receptionists.jsx'
import Admins from './pages/admins/Admins.jsx'
import Users from './pages/users/Users.jsx'
import Settings from './pages/settings/Settings.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Medicines from './pages/medicines/Medicines.jsx'
import OPDForm from './pages/opd/OPDForm.jsx'
import IPDForm from './pages/ipd/IPDForm.jsx'
import DoctorForm from './pages/doctors/DoctorForm.jsx'
import NurseForm from './pages/nurses/NurseForm.jsx'
import PharmacistForm from './pages/pharmacist/PharmacistForm.jsx'
import MedicineForm from './pages/medicines/MedicineForm.jsx'
import ReceptionistForm from './pages/receptionists/ReceptionistForm.jsx'
import AdminForm from './pages/admins/AdminForm.jsx'
import UserForm from './pages/users/UserForm.jsx'
import PatientBloodGluLog from './pages/patients/PatientBloodGluLog.jsx'
import PatientIOChart from './pages/patients/PatientIOChart.jsx'
import PatientBloodTransfusion from './pages/patients/PatientBloodTransfusion.jsx'
import PatientProcedure from './pages/patients/PatientProcedure.jsx'

let defaultRouter = createBrowserRouter([
  {
    path:'/',
    element:<Auth/>,
    errorElement:<Auth/>
  },
  {
    path:'/auth',
    element:<Auth/>
  },
  {
    path:'/home',
    element:<Home/>
  },
])

let user = localStorage.getItem("user");
let role = (user) ? JSON.parse(user).role : null;

const adminRouter = createBrowserRouter([
  {
    path:'/cap-up-page',
    element:<CapUp/>
  },
  {
    path:'/print-page',
    element:<PrintPage/>
  },
  {
    path:'/',
    element:<Auth/>
  },
  {
    path:'/auth',
    element:<Auth/>
  },
  {
    path:'/home',
    element:<Home/>
  },
  {
    path:'/ipd',
    element:<IPD/>
  },
  {
    path:'/opd',
    element:<OPD/>
  },
  {
    path:'/account',
    element:<Account />
  },
  {
    path:'/inventory',
    element:<Inventory />
  },
  {
    path:'/hrms',
    element:<HRMS />
  },
  {
    path:'/pos',
    element:<POS />
  },
  {
    path:'/diagnosis',
    element:<Diagnosis />
  },
  {
    path:'/frontdesk',
    element:<FrontDesk />
  },
  {
    path:'/pharmacists',
    element:<Pharmacist />
  },
  {
    path:'/admin-panel',
    element:<Panel />,
    children:[
      {
        path:'/admin-panel',
        element:<Dashboard />
      },
      {
        path:'/admin-panel/dashboard',
        element:<Dashboard />
      },
      {
        path:'/admin-panel/registration',
        element:<PatientRegistration />,
        children:[
          {
            path:'/admin-panel/registration',
            element:<OPDForm />,
          },
          {
            path:'/admin-panel/registration/opd',
            element:<OPDForm />,
          },
          {
            path:'/admin-panel/registration/ipd',
            element:<IPDForm />,
          }
        ]
      },
      {
        path:'/admin-panel/opd',
        element:<OPD />
      },
      {
        path:'/admin-panel/opd/add',
        element:<OPDForm />
      },
      {
        path:'/admin-panel/opd/edit/:id',
        element:<OPDForm />
      },
      {
        path:'/admin-panel/ipd',
        element:<IPD />
      },
      {
        path:'/admin-panel/ipd/add',
        element:<IPDForm />
      },
      ,
      {
        path:'/admin-panel/ipd/edit/:id',
        element:<IPDForm />
      },
      {
        path:'/admin-panel/all-patients',
        element:<AllPatients />
      },
      {
        path:'/admin-panel/all-patients/patient-details/:type/:id',
        element:<PatientDetails />,
        children:[
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id',
            element:<PatientProcedure />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/procedures',
            element:<PatientProcedure />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/vital-signs',
            element:<PatientVitalSigns />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/blood-glucose',
            element:<PatientBloodGluLog />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/blood-transfusion',
            element:<PatientBloodTransfusion />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/io-chart',
            element:<PatientIOChart />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/treatment-plan',
            element:<PatientTreatmentPlan />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/current-medications',
            element:<PatientCurrentMedications />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/appointment-history',
            element:<PatientAppointmentsHistory />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/notes',
            element:<PatientNotes />
          }
        ]
      },
      {
        path:'/admin-panel/doctors',
        element:<Doctors />
      },
      {
        path:'/admin-panel/doctors/add',
        element:<DoctorForm />
      },
      {
        path:'/admin-panel/doctors/edit/:id',
        element:<DoctorForm />
      },
      {
        path:'/admin-panel/nurses',
        element:<Nurses />
      },
      {
        path:'/admin-panel/nurses/add',
        element:<NurseForm />
      },
      {
        path:'/admin-panel/nurses/edit/:id',
        element:<NurseForm />
      },
      {
        path:'/admin-panel/pharmacists',
        element:<Pharmacist />
      },
      {
        path:'/admin-panel/pharmacists/add',
        element:<PharmacistForm />
      },
      {
        path:'/admin-panel/pharmacists/edit/:id',
        element:<PharmacistForm />
      },
      {
        path:'/admin-panel/medicines',
        element:<Medicines />
      },
      {
        path:'/admin-panel/medicines/add',
        element:<MedicineForm />
      },
      {
        path:'/admin-panel/medicines/edit/:id',
        element:<MedicineForm />
      },
      {
        path:'/admin-panel/receptionists',
        element:<Receptionists />
      },
      {
        path:'/admin-panel/receptionists/add',
        element:<ReceptionistForm />
      },
      {
        path:'/admin-panel/receptionists/edit/:id',
        element:<ReceptionistForm />
      },
      {
        path:'/admin-panel/admins',
        element:<Admins />
      },
      {
        path:'/admin-panel/admins/add',
        element:<AdminForm />
      },
      {
        path:'/admin-panel/admins/edit/:id',
        element:<AdminForm />
      },
      {
        path:'/admin-panel/users',
        element:<Users />
      },
      {
        path:'/admin-panel/users/add',
        element:<UserForm />
      },
      {
        path:'/admin-panel/users/edit/:id',
        element:<UserForm />
      },
      {
        path:'/admin-panel/settings',
        element: <Settings />,
      }
    ]
  },
])

const doctorRouter = createBrowserRouter([
  {
    path:'/',
    element:<Auth/>
  },
  {
    path:'/auth',
    element:<Auth/>
  },
  {
    path:'/home',
    element:<Home/>
  },
  {
    path:'/ipd',
    element:<IPD/>
  },
  {
    path:'/opd',
    element:<OPD/>
  },
  {
    path:'/account',
    element:<Account />
  },
  {
    path:'/admin-panel',
    element:<Panel />,
    children:[
      {
        path:'/admin-panel',
        element:<Dashboard />
      },
      {
        path:'/admin-panel/dashboard',
        element:<Dashboard />
      },
      {
        path:'/admin-panel/opd',
        element:<OPD />
      },
      {
        path:'/admin-panel/ipd',
        element:<IPD />
      },
      {
        path:'/admin-panel/all-patients',
        element:<AllPatients />
      },
      {
        path:'/admin-panel/all-patients/patient-details/:type/:id',
        element:<PatientDetails />,
        children:[
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id',
            element:<PatientProcedure />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/procedures',
            element:<PatientProcedure />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/vital-signs',
            element:<PatientVitalSigns />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/blood-glucose',
            element:<PatientBloodGluLog />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/blood-transfusion',
            element:<PatientBloodTransfusion />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/io-chart',
            element:<PatientIOChart />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/treatment-plan',
            element:<PatientTreatmentPlan />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/current-medications',
            element:<PatientCurrentMedications />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/appointment-history',
            element:<PatientAppointmentsHistory />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/notes',
            element:<PatientNotes />
          }
        ]
      },
      {
        path:'/admin-panel/medicines',
        element:<Medicines />
      },
    ]
  },
])

const nurseRouter = createBrowserRouter([
  {
    path:'/cap-up-page',
    element:<CapUp/>
  },
  {
    path:'/print-page',
    element:<PrintPage/>
  },
  {
    path:'/',
    element:<Auth/>
  },
  {
    path:'/auth',
    element:<Auth/>
  },
  {
    path:'/home',
    element:<Home/>
  },
  {
    path:'/ipd',
    element:<IPD/>
  },
  {
    path:'/opd',
    element:<OPD/>
  },
  {
    path:'/account',
    element:<Account />
  },
  {
    path:'/admin-panel',
    element:<Panel />,
    children:[
      {
        path:'/admin-panel',
        element:<Dashboard />
      },
      {
        path:'/admin-panel/dashboard',
        element:<Dashboard />
      },
      {
        path:'/admin-panel/registration',
        element:<PatientRegistration />,
        children:[
          {
            path:'/admin-panel/registration',
            element:<OPDForm />,
          },
          {
            path:'/admin-panel/registration/opd',
            element:<OPDForm />,
          },
          {
            path:'/admin-panel/registration/ipd',
            element:<IPDForm />,
          }
        ]
      },
      {
        path:'/admin-panel/opd',
        element:<OPD />
      },
      {
        path:'/admin-panel/opd/add',
        element:<OPDForm />
      },
      {
        path:'/admin-panel/opd/edit/:id',
        element:<OPDForm />
      },
      {
        path:'/admin-panel/ipd',
        element:<IPD />
      },
      {
        path:'/admin-panel/ipd/add',
        element:<IPDForm />
      },
      ,
      {
        path:'/admin-panel/ipd/edit/:id',
        element:<IPDForm />
      },
      {
        path:'/admin-panel/all-patients',
        element:<AllPatients />
      },
      {
        path:'/admin-panel/all-patients/patient-details/:type/:id',
        element:<PatientDetails />,
        children:[
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id',
            element:<PatientProcedure />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/procedures',
            element:<PatientProcedure />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/vital-signs',
            element:<PatientVitalSigns />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/blood-glucose',
            element:<PatientBloodGluLog />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/blood-transfusion',
            element:<PatientBloodTransfusion />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/io-chart',
            element:<PatientIOChart />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/treatment-plan',
            element:<PatientTreatmentPlan />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/current-medications',
            element:<PatientCurrentMedications />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/appointment-history',
            element:<PatientAppointmentsHistory />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/notes',
            element:<PatientNotes />
          }
        ]
      },
      {
        path:'/admin-panel/medicines',
        element:<Medicines />
      },
      {
        path:'/admin-panel/medicines/add',
        element:<MedicineForm />
      },
      {
        path:'/admin-panel/medicines/edit/:id',
        element:<MedicineForm />
      },
    ]
  },
])

const frontdeskRouter = createBrowserRouter([
  {
    path:'/cap-up-page',
    element:<CapUp/>
  },
  {
    path:'/print-page',
    element:<PrintPage/>
  },
  {
    path:'/',
    element:<Auth/>
  },
  {
    path:'/auth',
    element:<Auth/>
  },
  {
    path:'/home',
    element:<Home/>
  },
  {
    path:'/ipd',
    element:<IPD/>
  },
  {
    path:'/opd',
    element:<OPD/>
  },
  {
    path:'/account',
    element:<Account />
  },
  {
    path:'/admin-panel',
    element:<Panel />,
    children:[
      {
        path:'/admin-panel',
        element:<Dashboard />
      },
      {
        path:'/admin-panel/dashboard',
        element:<Dashboard />
      },
      {
        path:'/admin-panel/registration',
        element:<PatientRegistration />,
        children:[
          {
            path:'/admin-panel/registration',
            element:<OPDForm />,
          },
          {
            path:'/admin-panel/registration/opd',
            element:<OPDForm />,
          },
          {
            path:'/admin-panel/registration/ipd',
            element:<IPDForm />,
          }
        ]
      },
      {
        path:'/admin-panel/opd',
        element:<OPD />
      },
      {
        path:'/admin-panel/opd/add',
        element:<OPDForm />
      },
      {
        path:'/admin-panel/opd/edit/:id',
        element:<OPDForm />
      },
      {
        path:'/admin-panel/ipd',
        element:<IPD />
      },
      {
        path:'/admin-panel/ipd/add',
        element:<IPDForm />
      },
      ,
      {
        path:'/admin-panel/ipd/edit/:id',
        element:<IPDForm />
      },
      {
        path:'/admin-panel/all-patients',
        element:<AllPatients />
      },
    ]
  },
])

const pharmacistRouter = createBrowserRouter([
  {
    path:'/',
    element:<Auth/>
  },
  {
    path:'/auth',
    element:<Auth/>
  },
  {
    path:'/home',
    element:<Home/>
  },
  {
    path:'/ipd',
    element:<IPD/>
  },
  {
    path:'/opd',
    element:<OPD/>
  },
  {
    path:'/account',
    element:<Account />
  },
  {
    path:'/admin-panel',
    element:<Panel />,
    children:[
      {
        path:'/admin-panel',
        element:<Dashboard />
      },
      {
        path:'/admin-panel/dashboard',
        element:<Dashboard />
      },
      {
        path:'/admin-panel/opd',
        element:<OPD />
      },
      {
        path:'/admin-panel/ipd',
        element:<IPD />
      },
      {
        path:'/admin-panel/all-patients',
        element:<AllPatients />
      },
      
      {
        path:'/admin-panel/all-patients/patient-details/:type/:id',
        element:<PatientDetails />,
        children:[
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id',
            element:<PatientProcedure />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/procedures',
            element:<PatientProcedure />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/vital-signs',
            element:<PatientVitalSigns />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/blood-glucose',
            element:<PatientBloodGluLog />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/blood-transfusion',
            element:<PatientBloodTransfusion />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/io-chart',
            element:<PatientIOChart />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/treatment-plan',
            element:<PatientTreatmentPlan />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/current-medications',
            element:<PatientCurrentMedications />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/appointment-history',
            element:<PatientAppointmentsHistory />
          },
          {
            path:'/admin-panel/all-patients/patient-details/:type/:id/notes',
            element:<PatientNotes />
          }
        ]
      },
      {
        path:'/admin-panel/medicines',
        element:<Medicines />
      },
      {
        path:'/admin-panel/medicines/add',
        element:<MedicineForm />
      },
      {
        path:'/admin-panel/medicines/edit/:id',
        element:<MedicineForm />
      },
    ]
  },
])

const routerSelector = (role) => {
  let router = defaultRouter;  
  if(role=="admin"){
    localStorage.setItem("router","admin");
    console.log("admin's router using...")
    router = adminRouter;
  }
  if(role=="doctor"){
    localStorage.setItem("router","doctor");
    console.log("doctor's router using...")
    router = doctorRouter;
  }
  if(role=="nurse"){
    localStorage.setItem("router","nurse");
    console.log("nurse's router using...")
    router = nurseRouter;
  }
  if(role=="pharmacist"){
    localStorage.setItem("router","pharmacist");
    console.log("pharmacist's router using...")
    router = pharmacistRouter;
  }
  if(role=="frontdesk"){
    localStorage.setItem("router","frontdesk");
    console.log("frontdesk's router using...")
    router = frontdeskRouter;
  }
  return router;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routerSelector(role)} />,
)
