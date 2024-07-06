import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { Notify } from "../../utils/notifier";
import { getAllPatient } from "../../utils/apis/PatientApi";
import { deleteOPDPatient } from "../../utils/apis/OPDPatientApi";
import { deleteIPDPatient } from "../../utils/apis/IPDPatientApi";
import { Loader } from "../../components/loader/Loader";
import Permission from "../../utils/helpers/Permission";

const Record = ({
  id,
  uid,
  opdIpd,
  name,
  age,
  sex,
  symptoms,
  phone,
  date,
  status,
  userRole,
  deleteSelectedOpdRecord,
  deleteSelectedIpdRecord,
}) => {
  return (
    <tr className="odd:bg-gray-50">
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {id}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {opdIpd}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {name}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
        {age.slice(0, 10)}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
        {sex}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
        {symptoms}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
        {phone}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
        {date.slice(0, 10)}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {status}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-center">
        {(Permission.patientDetailsPermission.view).includes(userRole) ? 
        <Link
          to={(opdIpd == "opd") ?`/admin-panel/all-patients/patient-details/opd/${uid}`:`/admin-panel/all-patients/patient-details/ipd/${uid}`}
          class="inline-block rounded bg-gray-400 px-4 py-2 text-xs font-medium text-white hover:bg-gray-600 me-2"
        >
          <i class="fa-solid fa-pen-to-square me-2"></i> View
        </Link> : '' }
        {(Permission.patientsPermission.edit).includes(userRole) ? 
        <Link
          to={(opdIpd == "opd")?`/admin-panel/opd/edit/${uid}`:`/admin-panel/ipd/edit/${uid}`}
          class="inline-block rounded bg-gray-600 px-4 py-2 text-xs font-medium text-white hover:bg-gray-800 me-2"
        >
          <i class="fa-solid fa-pen-to-square me-2"></i> Edit
        </Link> : '' }
        {(Permission.patientsPermission.delete).includes(userRole) ? 
        <Link
          to="/admin-panel/all-patients"
          onClick={() => {
            opdIpd == "opd"
              ? deleteSelectedOpdRecord(uid)
              : deleteSelectedIpdRecord(uid);
          }}
          class="inline-block rounded bg-black px-4 py-2 text-xs font-medium text-white hover:bg-gray-700"
        >
          <i class="fa-solid fa-trash me-2"></i> Delete
        </Link> : '' }
      </td>
    </tr>
  );
};

export default function AllPatients() {
  const [pageNo,setPageNo] = useState(1);
  const [totalNo,setTotalNo] = useState(1);
  const [loader,setLoader] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [userRole,setUserRole] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.role : '');

  const [patientRecords, setPatientRecords] = useState(null);

  const loadAllPatientRecord = async () => {
    try {
      const patients = await getAllPatient(token);
      console.log(patients);
      setPatientRecords(patients);
      setTotalNo(Math.ceil((patients?.length)/10));
      setFilteredRecords(patients?.slice((0+(pageNo-1)*10),10*pageNo));
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const deleteSelectedOpdRecord = async (id) => {
    try {
      const response = await deleteOPDPatient(id, token);
      console.log(response);
      Notify("success", "Deleted successfully");
      if (response.status == "success") {
        loadAllPatientRecord();
      }
    } catch (error) {
      console.log(error);
      Notify("error", "Failed deleted");
    }
  };

  const deleteSelectedIpdRecord = async (id) => {
    try {
      const response = await deleteIPDPatient(id, token);
      console.log(response);
      Notify("success", "Deleted successfully");
      if (response.status == "success") {
        loadAllPatientRecord();
      }
    } catch (error) {
      console.log(error);
      Notify("error", "Failed deleted");
    }
  };

  const [filteredRecords,setFilteredRecords] = useState([]);
  const [filtered,setFiltered] = useState(false);
  const [query, setQuery] = useState('');
  const searchQuery = () => {
    if(query.length>0){
      const filteredUser = patientRecords.filter((user)=>{
        return (user.fname.toLowerCase().startsWith(query.toLowerCase()) || user.lname.toLowerCase().startsWith(query.toLowerCase()) || user.phone==query.toLowerCase() || user.email.toLowerCase().startsWith(query.toLowerCase()));
      });
      setFilteredRecords(filteredUser);
      setFiltered(true);
    }else{
      clearQuery();
    }
  }
  const clearQuery = () => {
    setFilteredRecords(patientRecords);
    setFiltered(false);
    setQuery('');
  }

  useEffect(() => {
    loadAllPatientRecord();
  }, [pageNo]);

  return (
    <>
      <h1 className="text-2xl font-bold text-start mb-6">
        All Patients Records
      </h1>
      <div className="flex justify-between flex-col md:flex-row gap-6">
        <form class="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 ms-0">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              value={query}
              onChange={(e)=>{setQuery(e.target.value); setFiltered(false)}}
              type="search"
              id="default-search"
              class="block sm:hidden w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="Name, Phone, Email..."
              required
            />
            <input
              value={query}
              onChange={(e)=>{setQuery(e.target.value); setFiltered(false)}}
              type="search"
              id="default-search"
              class="hidden sm:block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="Search Name, Phone, Email..."
              required
            />
            {
              (!filtered) ? 
              <button
                type="button"
                onClick={searchQuery}
                class="text-white absolute end-2.5 bottom-2.5 bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button> :
              <button
                type="button"
                onClick={clearQuery}
                class="text-white absolute end-2.5 bottom-2.5 bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Clear
              </button>
            }
          </div>
        </form>
        {(Permission.patientsPermission.add).includes(userRole) ?
        <Link
          to={"/admin-panel/registration"}
          class="text-white text-center end-2.5 bottom-2.5 bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-4"
        >
          Add New Patient
        </Link> : '' }
      </div>
      <div className="mt-8 overflow-x-auto max-w-screen min-h-96 relative mx-auto shadow-md mb-8 border border-gray-200 rounded-xl">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm ">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                #ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                OPD/IPD
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Age
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Gender
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Symptoms
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Phone
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Status
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRecords
              ? filteredRecords.map((user, index) => {
                  return (
                    <Record
                      key={user._id}
                      id={index + 1}
                      uid={user._id}
                      opdIpd={user.opdIpd}
                      name={user.fname + " " + user.lname}
                      age={user.dob}
                      sex={user.gender}
                      symptoms={user.symptoms}
                      phone={user.phone}
                      date={user.dob}
                      status={user.status}
                      userRole={userRole}
                      deleteSelectedOpdRecord={deleteSelectedOpdRecord}
                      deleteSelectedIpdRecord={deleteSelectedIpdRecord}
                    />
                  );
                })
              : ""}
          </tbody>
        </table>
        {!filteredRecords?.length ? (
          <h1 className="text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {(loader)?<Loader/>:"No Data Found.."}
          </h1>
        ) : (
          ""
        )}
      </div>
      <Pagination totalPages={totalNo} currentPage={pageNo} action={setPageNo}/>
    </>
  );
}
