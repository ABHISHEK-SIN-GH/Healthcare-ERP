import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { deleteMedicine, getAllMedicine } from "../../utils/apis/MedicineApi";
import { Notify } from "../../utils/notifier";
import { Loader } from "../../components/loader/Loader";
import Permission from "../../utils/helpers/Permission";

const Record = ({
  id,
  uid,
  medicine,
  brand,
  sellPrice,
  buyPrice,
  status,
  userRole,
  deleteSelectedMedicine,
}) => {
  return (
    <tr className="odd:bg-gray-50">
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {id}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {medicine}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {brand}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
        {sellPrice}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
        {buyPrice}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
        {status}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-center">
        {(Permission.medicinesPermission.edit).includes(userRole) ? 
        <Link
          to={`/admin-panel/medicines/edit/${uid}`}
          class="inline-block rounded bg-gray-400 px-4 py-2 text-xs font-medium text-white hover:bg-gray-700 me-2"
        >
          <i class="fa-solid fa-pen-to-square me-2"></i> Edit
        </Link> : '' }
        {(Permission.medicinesPermission.delete).includes(userRole) ? 
        <Link
          to="/admin-panel/medicines"
          onClick={() => {
            deleteSelectedMedicine(uid);
          }}
          class="inline-block rounded bg-black px-4 py-2 text-xs font-medium text-white hover:bg-gray-700"
        >
          <i class="fa-solid fa-trash me-2"></i> Delete
        </Link> : '' } 
      </td>
    </tr>
  );
};

export default function Medicines() {
  const [pageNo,setPageNo] = useState(1);
  const [totalNo,setTotalNo] = useState(1);
  const [loader,setLoader] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [userRole,setUserRole] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.role : '');

  const [medicineRecords, setMedicineRecords] = useState(null);

  const loadAllMedicine = async () => {
    try {
      const medicines = await getAllMedicine(token);
      console.log(medicines);
      setMedicineRecords(medicines);
      setTotalNo(Math.ceil((medicines?.length)/10));
      setFilteredRecords(medicines?.slice((0+(pageNo-1)*10),10*pageNo));
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const deleteSelectedMedicine = async (id) => {
    try {
      const response = await deleteMedicine(id, token);
      console.log(response);
      Notify("success", "Deleted successfully");
      if (response.status == "success") {
        loadAllMedicine();
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
      const filteredMedicine = medicineRecords.filter((medicine)=>{
        return (medicine.name.toLowerCase().startsWith(query.toLowerCase()) || medicine.brand.toLowerCase().startsWith(query.toLowerCase()));
      });
      setFilteredRecords(filteredMedicine);
      setFiltered(true);
    }else{
      clearQuery();
    }
  }
  const clearQuery = () => {
    setFilteredRecords(medicineRecords);
    setFiltered(false);
    setQuery('');
  }

  useEffect(() => {
    loadAllMedicine();
  }, [pageNo]);

  return (
    <>
      <h1 className="text-2xl font-bold text-start mb-6">
        All Medicines Records
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
              placeholder="Medicine name, brand..."
              required
            />
            <input
              value={query}
              onChange={(e)=>{setQuery(e.target.value); setFiltered(false)}}
              type="search"
              id="default-search"
              class="hidden sm:block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="Medicine name, brand..."
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
        {(Permission.medicinesPermission.add).includes(userRole) ?
        <Link
          to={"/admin-panel/medicines/add"}
          class="text-white text-center end-2.5 bottom-2.5 bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-4"
        >
          Add New Medicine
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
                Medicine
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Brand
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Selling Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Buying Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Status
              </th>
              {
                ((Permission.medicinesPermission.add).includes(userRole) || 
                (Permission.medicinesPermission.edit).includes(userRole) || 
                (Permission.medicinesPermission.delete).includes(userRole)) ? 
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  Action
                </th> : ''
              }
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRecords
              ? filteredRecords.map((medicine, index) => {
                  return (
                    <Record
                      key={medicine._id}
                      id={index+1}
                      uid={medicine._id}
                      medicine={medicine.name}
                      brand={medicine.brand}
                      sellPrice={medicine.sellPrice}
                      buyPrice={medicine.buyPrice}
                      status={medicine.status}
                      userRole={userRole}
                      deleteSelectedMedicine={deleteSelectedMedicine}
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
