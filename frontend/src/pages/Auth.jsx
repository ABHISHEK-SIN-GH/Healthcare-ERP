import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/apis/AuthApi";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../utils/routes";

export default function Auth() {

  localStorage.setItem("user","");
  localStorage.setItem("jwt","");
  localStorage.setItem("router","");

  const passwordRef = useRef(null);

  let toastId;

  const navigate = useNavigate();
  
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const handleAuth = async () => {
    // navigate("/home");
    // console.log(username,password);
    if(!username && !password){
      toastId = toast.error("Enter username and password...")
      setTimeout(()=>{
        toast.dismiss(toastId);
      },1000)  
      return;
    }
    else if(!username){
      toastId = toast.error("Enter username...")
      setTimeout(()=>{
        toast.dismiss(toastId);
      },1000)  
      return;
    }
    else if(!password){
      toastId = toast.error("Enter password...")
      setTimeout(()=>{
        toast.dismiss(toastId);
      },1000)  
      return;
    }
    toastId = toast.loading("Please wait...")
    let timeoutId = setTimeout(()=>{
      toast.update(toastId, { render: "Starting Server..", type: "info"});
    },1500)
    const response = await auth({username,password});
    if(response.token){
      localStorage.setItem('jwt',response.token);
      localStorage.setItem('user',response.data);
      clearTimeout(timeoutId);
      toast.update(toastId, { render: "Loaded Successfully..", type: "success", isLoading:false});
      setTimeout(()=>{
        toast.dismiss(toastId);
        window.location.href = "/home"
      },1000)
    }
    if(response.error){
      clearTimeout(timeoutId);
      toast.update(toastId, { render: response.error, type: "error", isLoading:false});
      setTimeout(()=>{
        toast.dismiss(toastId);
      },1000)
    }
  }

  const eyeToggler = (passwordRef) => {
    let type = passwordRef.current.type;
    if(type=="password"){
      passwordRef.current.type = "text";
    }else{
      passwordRef.current.type = "password";
    }
  }

  return (
    <>
      <ToastContainer position="bottom-right"/>
      <div className="m-auto max-w-screen-xl h-screen flex flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-5xl font-bold text-blue-600 sm:text-5xl">VAYAM</h1>
          <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg border border-gray-300 sm:p-6 lg:p-8">
            <p className="text-center text-lg font-medium">Sign in to your account</p>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <input value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Enter Username"/>
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <input ref={passwordRef} value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Enter Password"/>
                <span onClick={()=>{eyeToggler(passwordRef)}} className="absolute inset-y-0 end-0 grid place-content-center px-4" >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                handleAuth()
              }}
              className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>
          </form>
          <p className="mx-auto mt-6 max-w-md text-2xl dancing-font text-center text-gray-700">
            Health Care <br /> Multispeciality Hospital
          </p>
        </div>
        <footer class="w-full mt-8">
          <h1 className="text-sm text-center">Developed and maintained by <b>Dreel Technologies</b></h1>
          <h1 className="text-sm text-center">© 2024 All rights reserved. <a href="https://tech.dreel.co" className="underline text-blue-600">dreel.co</a></h1>
        </footer>
      </div>
    </>
  );
}
