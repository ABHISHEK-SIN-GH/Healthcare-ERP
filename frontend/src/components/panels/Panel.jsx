import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import erpLogo from "../../assets/vite.svg";

const SideBarLink = ({ url, name, icon }) => {
  return (
    <>
      <li>
        <NavLink
          to={url}
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-gray-200 dark:hover:bg-gray-700 group"
              : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          }
        >
          {icon}
          <span class="ms-3">{name}</span>
        </NavLink>
      </li>
    </>
  );
};

export default function Panel() {
  const navigate = useNavigate();
  const [ham, setHam] = useState(false);
  const [profile, setProfile] = useState(false);
  
  let userData, role, username;

  try {
    userData = JSON.parse(localStorage.getItem('user'))
    role = JSON.parse(localStorage.getItem("user")).role;
    username = JSON.parse(localStorage.getItem("user")).username;
  } catch (error) {
    window.location.href = "/";
    return;
  }
  
  const profileRef = useRef(null);
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setProfile(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(profileRef);

  return (
    <>
      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                onClick={() => {
                  setHam(!ham);
                }}
                aria-controls="logo-sidebar"
                type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="#" class="ms-2 md:me-24 sm:flex hidden justify-center items-center">
                <span className=" me-2 text-xl rounded-full px-3 py-1 bg-blue-600 text-white">
                  <i class="fa-solid fa-heart-pulse"></i>
                </span>
                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Dreel Technologies
                </span>
              </a>
            </div>
            <div class="flex items-center">
                <h1 className="text-xl font-semibold">Hello, {userData.role}</h1>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ms-3">
                <div>
                  <button
                    ref={profileRef}
                    onClick={() => {
                      setProfile(true);
                    }}
                    type="button"
                    class="flex text-sm bg-blue-600 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span class="sr-only">Open user menu</span>
                    <div
                      class="w-8 h-8 rounded-full flex justify-center items-center"
                    >
                      <i class="fa-solid fa-user text-blue-100 "></i>
                    </div>
                    <div
                      id="userDropdown"
                      className={`${
                        profile ? "" : "hidden"
                      } z-10 absolute bg-white divide-y divide-gray-100 rounded-lg drop-shadow-lg w-44 dark:bg-gray-700 dark:divide-gray-600 translate-x-[-80%] translate-y-11`}
                    >
                      <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>{userData?.fname} {userData?.lname}</div>
                        <div class="font-medium truncate">
                            {userData?.username}
                        </div>
                      </div>
                      <ul
                        class="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="avatarButton"
                      >
                        <li>
                          <a
                            href="#"
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Profile
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Leave
                          </a>
                        </li>
                      </ul>
                      <div class="py-1"
                        onClick={()=>{
                          console.log('Logging Out...')
                          navigate('/',{replace:true})
                        }}
                      >
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Logout
                        </a>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        class={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          !ham ? "-translate-x-full" : "translate-none"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul
            class="space-y-2 font-medium"
            onClick={() => {
              setHam(!ham);
            }}
          >
            {
              (["admin","doctor","nurse","pharmacist","frontdesk"].includes(role)) ?     
              <SideBarLink
                url={"/admin-panel/dashboard"}
                name={"Dashboard"}
                icon={<i class="fa-solid fa-chart-pie"></i>}
              /> : ''
            }
            {
              (["admin","frontdesk"].includes(role)) ? 
              <SideBarLink
                url={"/admin-panel/registration"}
                name={"Registration"}
                icon={<i class="fa-solid fa-file-signature"></i>}
              /> : ''
            }
            
            {
              (["admin","doctor","nurse","frontdesk"].includes(role)) ? 
              <SideBarLink
                url={"/admin-panel/opd"}
                name={"OPD"}
                icon={<i class="fa-solid fa-house-medical"></i>}
              /> : ''
            }
            
            {
              (["admin","doctor","nurse","frontdesk"].includes(role)) ? 
              <SideBarLink
                url={"/admin-panel/ipd"}
                name={"IPD"}
                icon={<i class="fa-solid fa-bed-pulse"></i>}
              /> : ''
            }
            
            {
              (["admin","doctor","nurse","pharmacist","frontdesk"].includes(role)) ? 
              <SideBarLink
                url={"/admin-panel/all-patients"}
                name={"Patients"}
                icon={<i class="fa-solid fa-user-injured"></i>}
              /> : ''
            }
            
            {
              (["admin"].includes(role)) ? 
              <SideBarLink
                url={"/admin-panel/doctors"}
                name={"Doctors"}
                icon={<i class="fa-solid fa-user-doctor"></i>}
              /> : ''
            }
            {
              (["admin"].includes(role)) ? 
              <SideBarLink
                url={"/admin-panel/nurses"}
                name={"Nurses"}
                icon={<i class="fa-solid fa-user-nurse"></i>}
              /> : '' 
            }
            {
              (["admin"].includes(role)) ? 
              <SideBarLink
                url={"/admin-panel/pharmacists"}
                name={"Pharmacists"}
                icon={<i class="fa-solid fa-hospital-user"></i>}
              /> : ''
            }
            
            {
              (["admin","doctor","nurse","pharmacist"].includes(role)) ? 
              <SideBarLink
                url={"/admin-panel/medicines"}
                name={"Medicines"}
                icon={<i class="fa-solid fa-capsules"></i>}
              /> : ''
            }
            
            {
              (["admin"].includes(role)) ? 
              <SideBarLink
                url={"/admin-panel/receptionists"}
                name={"FrontDesk"}
                icon={<i class="fa-solid fa-user-tie"></i>}
              /> : ''
            }
            
            {
              (["admin"].includes(role)) ? 
              <SideBarLink
                url={"/admin-panel/admins"}
                name={"Admins"}
                icon={<i class="fa-solid fa-user"></i>}
              /> : ''
            }
            
            {
              (["admin"].includes(role) && username=="admin") ? 
              <SideBarLink
                url={"/admin-panel/users"}
                name={"Users"}
                icon={<i class="fa-solid fa-users"></i>}
              /> : ''
            }
            
            {
              (["admin"].includes(role)) ? 
              <SideBarLink
                url={"/admin-panel/settings"}
                name={"Settings"}
                icon={<i class="fa-solid fa-gears"></i>}
              /> : ''
            }
            
          </ul>
        </div>
      </aside>

      <div class="p-4 sm:ml-64">
        <div class="pt-4 border-0 md:p-4 md:pt-10 md:border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-[60px]">
          <Outlet />
        </div>
        <footer class="w-full mt-8">
          <h1 className="text-xs text-center">All rights reserved. <a href="https://tech.dreel.co" className="underline">dreel.co</a></h1>
        </footer>
      </div>

      <ToastContainer position="bottom-right" autoClose={1500} />
    </>
  );
}
