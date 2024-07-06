import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import CapUp from '../../components/media_utils/CapUp'
import { useEffect } from 'react';
import { getIPDPatient, getOPDPatient } from '../../utils/apis/PatientApi';

export default function PatientDetails() {
    const {type,id} = useParams();
    const navigate = useNavigate(); 
    const [token,setToken] = useState(localStorage.getItem("jwt"));

    const [modal,setModal] = useState(false);
    const modalFunc = () => {
        setModal(!modal);
    }

    const [patient,setPatient] = useState({});
    const getPatientDetails = async () => {
        if(type=="opd"){
            const response = await getOPDPatient(id,token)
            console.log(response); 
            setPatient(response);
        }else{
            const response = await getIPDPatient(id,token)
            console.log(response);
            setPatient(response);
        }
    }

    const role = JSON.parse(localStorage.getItem("user")).role;

    useEffect(()=>{
        getPatientDetails();
        if(role!="pharmacist"){
            navigate(`/admin-panel/all-patients/patient-details/${type}/${id}/procedures`,{replace:'true'});
        }else{
            navigate(`/admin-panel/all-patients/patient-details/${type}/${id}/current-medications`,{replace:'true'});
        }
    },[])
    
    return (
    <>
        <h1 className='text-2xl font-bold text-center mb-6'>Patient Details</h1>
        <div class="bg-gray-100 rounded-xl mt-8">
            <div class="container mx-auto py-8">
                <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div class="col-span-12 xl:col-span-4 2xl:col-span-3">
                        <div class="bg-white shadow rounded-lg p-6 relative">
                            {(patient.newPatient=="Yes")?<div class="ribbon ribbon-top-left"><span class="bg-gray-600 text-white text-sm">New Patient</span></div>:''}
                            <div class="flex flex-col items-center">
                                <div class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0 flex justify-center items-center">
                                    <i class="fa-solid fa-user-injured text-6xl opacity-75"></i>    
                                </div>
                                <h1 class="text-xl font-bold">{patient.fname} {patient.lname}</h1>
                                <p class="text-gray-700">Patient ID: #{patient._id?.slice(0,8)}</p>
                                <div class="mt-3 flex flex-wrap gap-4 justify-center">
                                    <a href="#" class="bg-gray-600 hover:bg-gray-400 text-white py-2 px-4 rounded font-semibold">Contact</a>
                                    <a href="#" class="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded font-semibold">Report</a>
                                </div>
                            </div>
                            <hr class="mt-6 border-t border-gray-300"/>
                            <div class="flex flex-col">
                                <span class="text-gray-700 uppercase font-bold tracking-wider my-3">Medical History</span>
                                <hr class="mb-3 border-t border-gray-300"/>
                                <small><b>Allergies:</b> <br />
                                    <span contentEditable>Penicillin</span>
                                </small>
                                <hr class="my-2 border-t border-gray-300"/>
                                <small><b>Pre-existing Conditions:</b> <br />
                                    <span contentEditable>Hypertension, Diabetes</span>
                                </small>
                                <hr class="my-2 border-t border-gray-300"/>
                                <small><b>Medications:</b> <br />
                                    <span contentEditable>Aspirin (81mg), Metformin (500mg)</span>
                                </small>
                                <hr class="my-2 border-t border-gray-300"/>
                                <small><b>Surgical History:</b> <br />
                                    <span contentEditable>Appendectomy (2010)</span>
                                </small>
                                <hr class="my-2 border-t border-gray-300"/>
                                <small><b>Family Medical History:</b> <br />
                                    <span contentEditable>Heart Disease (Father), Breast Cancer (Mother)</span>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-12 xl:col-span-8 2xl:col-span-9">
                        <div>
                            <div class="sm:hidden grid grid-cols-3">
                                <div className='col-span-3'>
                                    <label for="Tab" class="sr-only">Tab</label>
                                    {
                                        (role!="pharmacist") ? 
                                        <select id="Tab" class="w-full rounded-md border-gray-200 p-4" onChange={(e)=>{navigate(e.target.value)}}>
                                            <option selected value={`/admin-panel/all-patients/patient-details/${type}/${id}/procedures`}>Procedures</option>
                                            <option value={`/admin-panel/all-patients/patient-details/${type}/${id}/vital-signs`}>Vital Signs</option>
                                            <option value={`/admin-panel/all-patients/patient-details/${type}/${id}/blood-glucose`}>Blood Glucose</option>
                                            <option value={`/admin-panel/all-patients/patient-details/${type}/${id}/blood-transfusion`}>Blood Transfusion</option>
                                            <option value={`/admin-panel/all-patients/patient-details/${type}/${id}/io-chart`}>IO Chart</option>
                                            <option value={`/admin-panel/all-patients/patient-details/${type}/${id}/treatment-plan`}>Treatment Plan</option>
                                            <option value={`/admin-panel/all-patients/patient-details/${type}/${id}/current-medications`}>Current Medications</option>
                                            <option value={`/admin-panel/all-patients/patient-details/${type}/${id}/appointment-history`}>Appointment History</option>
                                            <option value={`/admin-panel/all-patients/patient-details/${type}/${id}/notes`}>Notes and Comments</option>
                                        </select> : 
                                        <select id="Tab" class="w-full rounded-md border-gray-200 p-4" onChange={(e)=>{navigate(e.target.value)}}>
                                            <option selected value={`/admin-panel/all-patients/patient-details/${type}/${id}/current-medications`}>Current Medications</option>
                                            <option value={`/admin-panel/all-patients/patient-details/${type}/${id}/treatment-plan`}>Treatment Plan</option>
                                        </select>
                                    }
                                </div>
                            </div>
                            <div class="hidden sm:block">
                                <div class="border-b border-gray-200 flex items-center justify-between">
                                    {
                                        (role!="pharmacist") ? 
                                        <nav class="-mb-px flex overflow-auto">
                                            <NavLink
                                            to={`/admin-panel/all-patients/patient-details/${type}/${id}/procedures`}
                                            className={({isActive})=>isActive ? "shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-white bg-gray-600" : "shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"} 
                                            >
                                            Procedures
                                            </NavLink>
                                            <NavLink
                                            to={`/admin-panel/all-patients/patient-details/${type}/${id}/vital-signs`}
                                            className={({isActive})=>isActive ? "shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-white bg-gray-600" : "shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"} 
                                            >
                                            Vital Signs
                                            </NavLink>
                                            <NavLink
                                            to={`/admin-panel/all-patients/patient-details/${type}/${id}/blood-glucose`}
                                            className={({isActive})=>isActive ? "shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-white bg-gray-600" : "shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"} 
                                            >
                                            Blood Glucose
                                            </NavLink>
                                            <NavLink
                                            to={`/admin-panel/all-patients/patient-details/${type}/${id}/blood-transfusion`}
                                            className={({isActive})=>isActive ? "shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-white bg-gray-600" : "shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"} 
                                            >
                                            Blood Transfusion
                                            </NavLink>
                                            <NavLink
                                            to={`/admin-panel/all-patients/patient-details/${type}/${id}/io-chart`}
                                            className={({isActive})=>isActive ? "shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-white bg-gray-600" : "shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"} 
                                            >
                                            I/O Chart
                                            </NavLink>
                                            <NavLink
                                            to={`/admin-panel/all-patients/patient-details/${type}/${id}/treatment-plan`}
                                            className={({isActive})=>isActive ? "shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-white bg-gray-600" : "shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"} 
                                            >
                                            Treatment Plan
                                            </NavLink>
                                            <NavLink
                                            to={`/admin-panel/all-patients/patient-details/${type}/${id}/current-medications`}
                                            className={({isActive})=>isActive ? "shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-white bg-gray-600" : "shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"} 
                                            >
                                            Current Medications
                                            </NavLink>
                                            <NavLink
                                            to={`/admin-panel/all-patients/patient-details/${type}/${id}/appointment-history`}
                                            className={({isActive})=>isActive ? "shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-white bg-gray-600" : "shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"} 
                                            >
                                            Visits History
                                            </NavLink>
                                            <NavLink
                                            to={`/admin-panel/all-patients/patient-details/${type}/${id}/notes`}
                                            className={({isActive})=>isActive ? "shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-white bg-gray-600" : "shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"} 
                                            >
                                            Notes
                                            </NavLink>
                                        </nav> : 
                                        <nav class="-mb-px flex overflow-auto">
                                            <NavLink
                                            to={`/admin-panel/all-patients/patient-details/${type}/${id}/treatment-plan`}
                                            className={({isActive})=>isActive ? "shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-white bg-gray-600" : "shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"} 
                                            >
                                            Treatment Plan
                                            </NavLink>
                                            <NavLink
                                            to={`/admin-panel/all-patients/patient-details/${type}/${id}/current-medications`}
                                            className={({isActive})=>isActive ? "shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-white bg-gray-600" : "shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"} 
                                            >
                                            Current Medications
                                            </NavLink>
                                        </nav>
                                    }
                                </div>
                            </div>
                            <div className='bg-white rounded-lg'>
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {
            (modal) ?
            <div id="default-modal" tabindex="-1" aria-hidden="true" class={`overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 justify-center items-center w-full h-full`}>
                <div class="relative h-full bg-white">
                    <div class="fixed bg-white top-1/2 -translate-y-1/2 w-full sm:w-1/4 rounded-lg shadow dark:bg-gray-700"> 
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Upload Prescription
                            </h3>
                            <button type="button" onClick={()=>{modalFunc()}} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-4 md:p-5 space-y-4 h-96 w-full">
                            <CapUp uid={'mobile'}/>
                        </div>
                    </div>
                </div>
            </div> : ''
        }
    </>
  )
}
