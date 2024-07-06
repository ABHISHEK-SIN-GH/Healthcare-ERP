import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";

export default function PatientRegistration() {
  const navigate = useNavigate();

  useEffect(()=>{
    navigate('/admin-panel/registration/opd',{ replace: true });
  },[]);

  return (
    <>
      <div class="text-sm mb-6 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px">
          <li class="me-2">
            <NavLink
              to={"/admin-panel/registration/opd"}
              className={({isActive})=>(isActive)?"inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500":
              "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}
            >
              OPD Patient
            </NavLink>
          </li>
          <li class="me-2">
            <NavLink
              to={'/admin-panel/registration/ipd'}
              className={({isActive})=>(isActive)?"inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500":
              "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}
            >
              IPD Patient
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet/>
    </>
  );
}
