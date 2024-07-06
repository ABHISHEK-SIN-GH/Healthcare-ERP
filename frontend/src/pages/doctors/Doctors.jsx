import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { Notify } from "../../utils/notifier";
import { deleteDoctor, getAllDoctor } from "../../utils/apis/DoctorApi";
import { Loader } from "../../components/loader/Loader";
import Permission from "../../utils/helpers/Permission";

const Record = ({
  id,
  uid,
  doctor,
  designation,
  department,
  specialist,
  qualification,
  phone,
  status,
  userRole,
  deleteSelectedDoctor,
}) => {
  return (
    <tr className="odd:bg-gray-50">
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {id}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {doctor}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {designation}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {department}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
        {specialist}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
        {qualification}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
        {phone}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {status}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-center">
        {(Permission.doctorsPermission.edit).includes(userRole) ?
        <Link
          to={`/admin-panel/doctors/edit/${uid}`}
          class="inline-block rounded bg-gray-400 px-4 py-2 text-xs font-medium text-white hover:bg-gray-700 me-2"
        >
          <i class="fa-solid fa-pen-to-square me-2"></i> Edit
        </Link> : '' }
        {(Permission.doctorsPermission.delete).includes(userRole) ?
        <Link
          to="/admin-panel/doctors"
          onClick={() => {
            deleteSelectedDoctor(uid);
          }}
          class="inline-block rounded bg-black px-4 py-2 text-xs font-medium text-white hover:bg-gray-700"
        >
          <i class="fa-solid fa-trash me-2"></i> Delete
        </Link>  : '' }
      </td>
    </tr>
  );
};

export default function Doctors() {
  const [pageNo,setPageNo] = useState(1);
  const [totalNo,setTotalNo] = useState(1);
  const [loader,setLoader] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [userRole,setUserRole] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.role : '');

  const [doctorRecords, setDoctorRecords] = useState(null);

  const loadAllDoctor = async () => {
    try {
      const doctors = await getAllDoctor(token);
      console.log(doctors);
      setDoctorRecords(doctors);
      setTotalNo(Math.ceil((doctors?.length)/10));
      setFilteredRecords(doctors?.slice((0+(pageNo-1)*10),10*pageNo));
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const deleteSelectedDoctor = async (id) => {
    try {
      const response = await deleteDoctor(id, token);
      console.log(response);
      Notify("success", "Deleted successfully");
      if (response.status == "success") {
        loadAllDoctor();
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
      const filteredUser = doctorRecords.filter((user)=>{
        return (user.fname.toLowerCase().startsWith(query.toLowerCase()) || user.lname.toLowerCase().startsWith(query.toLowerCase()) || user.phone==query.toLowerCase() || user.email.toLowerCase().startsWith(query.toLowerCase()));
      });
      setFilteredRecords(filteredUser);
      setFiltered(true);
    }else{
      clearQuery();
    }
  }
  const clearQuery = () => {
    setFilteredRecords(doctorRecords);
    setFiltered(false);
    setQuery('');
  }

  useEffect(() => {
    loadAllDoctor();
  }, [pageNo]);
  return (
    <>
      <h1 className="text-2xl font-bold text-start mb-6">
        All Doctors Records
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
        {(Permission.doctorsPermission.add).includes(userRole) ? 
        <Link
          to={"/admin-panel/doctors/add"}
          class="text-white text-center end-2.5 bottom-2.5 bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-4"
        >
          Add New Doctor
        </Link> : '' }
      </div>
      <div className="mt-8 overflow-x-auto min-h-96 relative max-w-screen mx-auto shadow-md mb-8 border border-gray-200 rounded-xl">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm ">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                #ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Doctor
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Designation
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Department
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Specialist
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Qualification
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Phone
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
                      doctor={`${user.fname} ${user.lname}`}
                      designation={user.design}
                      department={user.depart}
                      qualification={user.qualification}
                      specialist={user.specialty}
                      phone={user.phone}
                      status={user.status}
                      userRole={userRole}
                      deleteSelectedDoctor={deleteSelectedDoctor}
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
