import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import {
  deleteFrontdesk,
  getAllFrontdesk,
} from "../../utils/apis/FrontdeskApi";
import { Notify } from "../../utils/notifier";
import { Loader } from "../../components/loader/Loader";
import Permission from "../../utils/helpers/Permission";

const Record = ({
  id,
  uid,
  receptionist,
  designation,
  qualification,
  phone,
  status,
  userRole,
  deleteSelectedFrontdesk
}) => {
  return (
    <tr className="odd:bg-gray-50">
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {id}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {receptionist}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {designation}
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
        {(Permission.frontdesksPermission.edit).includes(userRole) ? 
        <Link
          to={`/admin-panel/receptionists/edit/${uid}`}
          class="inline-block rounded bg-gray-400 px-4 py-2 text-xs font-medium text-white hover:bg-gray-700 me-2"
        >
          <i class="fa-solid fa-pen-to-square me-2"></i> Edit
        </Link> : '' }
        {(Permission.frontdesksPermission.delete).includes(userRole) ? 
        <Link
          to="/admin-panel/receptionists"
          onClick={() => {
            deleteSelectedFrontdesk(uid);
          }}
          class="inline-block rounded bg-black px-4 py-2 text-xs font-medium text-white hover:bg-gray-700"
        >
          <i class="fa-solid fa-trash me-2"></i> Delete
        </Link> : '' }
      </td>
    </tr>
  );
};

export default function Pharmacist() {
  const [pageNo,setPageNo] = useState(1);
  const [totalNo,setTotalNo] = useState(1);
  const [loader, setLoader] = useState(true);

  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [userRole,setUserRole] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.role : '');

  const [frontdeskRecords, setFrontdeskRecords] = useState(null);

  const loadAllFrontdesk = async () => {
    try {
      const frontdesks = await getAllFrontdesk(token);
      console.log(frontdesks);
      setFrontdeskRecords(frontdesks);
      setTotalNo(Math.ceil((frontdesks?.length)/10));
      setFilteredRecords(frontdesks?.slice((0+(pageNo-1)*10),10*pageNo));
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const deleteSelectedFrontdesk = async (id) => {
    try {
      const response = await deleteFrontdesk(id, token);
      console.log(response);
      Notify("success", "Deleted successfully");
      if (response.status == "success") {
        loadAllFrontdesk();
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
      const filteredUser = filteredRecords.filter((user)=>{
        return (user.fname.toLowerCase().startsWith(query.toLowerCase()) || user.lname.toLowerCase().startsWith(query.toLowerCase()) || user.phone==query.toLowerCase() || user.email.toLowerCase().startsWith(query.toLowerCase()));
      });
      setFilteredRecords(filteredUser);
      setFiltered(true);
    }else{
      clearQuery();
    }
  }
  const clearQuery = () => {
    setFilteredRecords(frontdeskRecords);
    setFiltered(false);
    setQuery('');
  }

  useEffect(() => {
    loadAllFrontdesk();
  }, [pageNo]);
  
  return (
    <>
      <h1 className="text-2xl font-bold text-start mb-6">
        All FrontDesks Records
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
        {(Permission.opdPermission.add).includes(userRole) ?
        <Link
          to={"/admin-panel/receptionists/add"}
          class="text-white text-center end-2.5 bottom-2.5 bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-4"
        >
          Add New Employee
        </Link> : '' }
      </div>
      <div className="mt-8 overflow-x-auto min-h-96 max-w-screen mx-auto shadow-md mb-8 border border-gray-200 rounded-xl relative">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm ">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                #ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                FrontDesk
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Designation
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
                      receptionist={`${user.fname} ${user.lname}`}
                      designation={user.design}
                      qualification={user.qualification}
                      phone={user.phone}
                      status={user.status}
                      userRole={userRole}
                      deleteSelectedFrontdesk={deleteSelectedFrontdesk}
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
