import React, { useEffect, useState } from "react";
import TextInput from "../forms/TextInput";
import EmailInput from "../forms/EmailInput";
import NumberInput from "../forms/NumberInput";
import TextareaInput from "../forms/TextareaInput";
import FileInput from "../forms/FileInput";
import Button from "../forms/Button";
import DateInput from "../forms/DateInput";
import RadioInput from "../forms/RadioInput";
import DropdownInput from "../forms/DropdownInput";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import moment from "moment";

export default function PrintPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [fname,setFName] = useState(state.fname);
  const [lname,setLName] = useState(state.lname);
  const [phone,setPhone] = useState(state.phone);
  const [email,setEmail] = useState(state.email);
  const [dob,setDob] = useState((state.dob)?(state.dob):'');
  const [gender,setGender] = useState(state.gender);
  const [address,setAddress] = useState(state.address);
  const [newPatient,setNewPatient] = useState(state.newPatient);
  const [opdIpd,setOpdIpd] = useState(state.opdIpd);
  const [bloodGrp,setBloodGrp] = useState(state.bloodGrp);
  const [bloodPressure,setBloodPressure] = useState(state.bloodPressure);
  const [height,setHeight] = useState(state.height);
  const [weight,setWeight] = useState(state.weight);
  const [symptoms,setSymptoms] = useState(state.symptoms);
  const [depart,setDepart] = useState(state.depart);
  const [consultant,setConsultant] = useState(state.consultant.name);
  const [notes,setNotes] = useState(state.notes);
  const [charges,setCharges] = useState(state.charges);
  const [paymentMethod,setPaymentMethod] = useState(state.paymentMethod);
  const [timestamp,setTimeStamp] = useState('');

  const genders = [
    { name: "Male", value: "Male" },
    { name: "Female", value: "Female" },
    { name: "Others", value: "Others" },
  ];

  const departments = [
    { name: "General Medicine", value: "General Medicine" },
    { name: "Plastic Surgery", value: "Plastic Surgery" },
    {
      name: "Anaesthesiology & Clinical Care",
      value: "Anaesthesiology & Clinical Care",
    },
    {
      name: "General & Laparoscopic Surgery",
      value: "General & Laparoscopic Surgery",
    },
    { name: "Obstetrics & Gynecology", value: "Obstetrics & Gynecology" },
    { name: "Orthopaedics", value: "Orthopaedics" },
    { name: "Maxillofacial Surgery", value: "Maxillofacial Surgery" },
    { name: "Facial Esthetic Unit", value: "Facial Esthetic Unit" },
    { name: "ENT", value: "ENT" },
    { name: "Neurology", value: "Neurology" },
    { name: "Nephrology", value: "Nephrology" },
    { name: "Cardiology", value: "Cardiology" },
    { name: "Urology", value: "Urology" },
    { name: "Gastroenterology", value: "Gastroenterology" },
    { name: "Dermatology", value: "Dermatology" },
    { name: "Ophthalmology", value: "Ophthalmology" },
    { name: "Cosmetic Gynecology", value: "Cosmetic Gynecology" },
    { name: "Dental", value: "Dental" },
  ];

  const doctors = [
    { name: "Incharge Doctor", value: "Incharge Doctor" },
    { name: "Attending Doctor", value: "Attending Doctor" },
  ];

  const bloodGroups = [
    { name: "A+", value: "A+" },
    { name: "A-", value: "A-" },
    { name: "B+", value: "B+" },
    { name: "B-", value: "B-" },
    { name: "AB+", value: "AB+" },
    { name: "AB-", value: "AB-" },
    { name: "O+", value: "O+" },
    { name: "O-", value: "O-" },
  ];

  useEffect(()=>{
    let timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
    setTimeStamp(timestamp);
  },[])

  return (
    <div id="content">
      <div
        className="lg:col-span-3 relative border-4 border-indigo-900 hidden"
        style={{ height: "calc(29.7cm - 2px)", width: "calc(21cm - 2px)" }}
        id="section-to-print"
      >
        <div className="h-36 bg-indigo-900 flex items-center justify-between">
          <div className="bg-white h-18 ms-2 rounded-full px-6">
            <img src={logo} className="h-full" />
          </div>
          <div className="h-18 text-white text-end me-4 ">
            <small className="font-bold mb-4">LICENSE NO.: DURG0375/NH</small>
            <h1 className="text-2xl font-bold">
              वयम हेल्थ केयर-मल्टीस्पेशलिटी हॉस्पिटल
            </h1>
            <h1 className="text-lg">
              VAYAM HEALTH CARE-MULTISPECIALITY HOSPITAL
            </h1>
            <small className="font-bold">
              4/1, Priyadarshini Parisar, Opp. Supela Police Station, Bhilai
              (C.G.)
            </small>
          </div>
        </div>

        <div className="pb-6  px-8 mt-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Registration Form
          </h1>
          <div>
            <small className="uppercase font-semibold">{timestamp}</small><br />
            <small className="uppercase font-semibold">{state.opdIpd} | {state.depart}</small>
          </div>
        </div>
        <hr />
        <form
          action="#"
          className="mt-8 grid grid-cols-6 gap-6 px-8 lg:px-12"
          id="printJS-form"
        >
          <TextInput value={fname} action={setFName}
            label={"Patient First Name"}
            placeholder={"Enter Patient First Name .."}
          />
          <TextInput value={lname} action={setLName}
            label={"Patient Last Name"}
            placeholder={"Enter Patient Last Name .."}
          />
          <EmailInput value={email} action={setEmail}
            label={"Patient Email Address"}
            placeholder={"Enter Patient Email Address .."}
          />
          <TextInput value={dob} action={setDob}
            label={"Patient Date Of Birth"}
            placeholder={"Enter Patient DOB .."}
          />
          <NumberInput value={phone} action={setPhone}
            label={"Patient Phone Number"}
            placeholder={"Enter Patient Phone No. .."}
          />
          <TextInput value={gender} action={setGender}
            label={"Patient Gender"}
          />
          <TextInput value={newPatient} action={setNewPatient}
            label={"Is New Patient"}
          />
          <TextInput value={opdIpd} action={setOpdIpd}
            label={"OPD / IPD"}
          />
          <TextInput value={bloodGrp} action={setBloodGrp} label={"Patient Blood Group"}/>
          <TextInput value={address} action={setAddress}
            label={"Patient Address"}
            placeholder={"Enter Patient Address .."}
          />
          <TextInput value={depart} action={setDepart} label={"Select Department"} />
          <TextInput value={consultant} action={setConsultant} label={"Select Consultant"}/>
          <TextareaInput value={symptoms} action={setSymptoms}
            label={"Patient's Symptoms"}
            placeholder={"Enter Patient's Symptoms .."}
          />
          <TextareaInput value={notes} action={setNotes} label={"Notes"} placeholder={"Enter Notes .."} />
        </form>

        <div className="h-12 w-full bg-indigo-900 absolute bottom-0 text-white flex justify-center items-center">
          <small className="text-base me-4">
            <i class="fa-solid fa-globe"></i>{" "}
            <span className="font-bold">Website:</span> vayamhospital.com
          </small>
          <small className="text-base me-4">
            <i class="fa-regular fa-envelope"></i>{" "}
            <span className="font-bold">Email:</span> vayamhospital@gmail.com
          </small>
          <small className="text-base me-4">
            <i class="fa-solid fa-square-phone"></i> 7880082991, 7880082992
          </small>
        </div>
      </div>

      <div className="p-8 lg:col-span-3 mt-0 md:mt-8 max-w-3xl border-2 border-black mx-auto rounded-xl">
        <h1 className="pb-6 text-3xl text-center font-bold">
          Registration Form
        </h1>
        <hr />
        <form
          action="#"
          className="mt-8 grid grid-cols-6 gap-6"
          id="printJS-form"
        >
          <TextInput value={fname} action={setFName} 
            label={"Patient First Name"}
            placeholder={"Enter Patient First Name .."}
          />
          <TextInput value={lname} action={setLName} 
            label={"Patient Last Name"}
            placeholder={"Enter Patient Last Name .."}
          />
          <EmailInput value={email} action={setEmail} 
            label={"Patient Email Address"}
            placeholder={"Enter Patient Email Address .."}
          />
          <TextInput value={dob} action={setDob} 
            label={"Patient Date Of Birth"}
            placeholder={"Enter Patient DOB .."}
          />
          <NumberInput value={phone} action={setPhone} 
            label={"Patient Phone Number"}
            placeholder={"Enter Patient Phone No. .."}
          />
          <TextInput value={gender} action={setGender} 
            label={"Patient Gender"}
          />
          <TextInput value={newPatient} action={setNewPatient} 
            label={"Is New Patient"}
          />
          <TextInput value={opdIpd} action={setOpdIpd} 
            label={"OPD / IPD"}
          />
          <TextInput value={bloodGrp} action={setBloodGrp}  label={"Patient Blood Group"}/>
          <TextInput value={address} action={setAddress} 
            label={"Patient Address"}
            placeholder={"Enter Patient Address .."}
          />
          <TextInput value={depart} action={setDepart}  label={"Select Department"} />
          <TextInput value={consultant} action={setConsultant}  label={"Select Consultant"}  />
          <TextareaInput value={symptoms} action={setSymptoms} 
            label={"Patient's Symptoms"}
            placeholder={"Enter Patient's Symptoms .."}
          />
          <TextareaInput  value={notes} action={setNotes} label={"Notes"} placeholder={"Enter Notes .."} />
        </form>
      </div>

      <div className="flex justify-center my-8 ">
        <div class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
          <button
            class="inline-block border-e px-4 py-2 text-xl font-medium text-gray-100 bg-black hover:bg-gray-800 focus:relative"
            onClick={() => {
              window.print();
            }}
          >
            Print
          </button>
          <button
            class="inline-block border-e px-4 py-2 text-xl font-medium text-gray-700 hover:bg-gray-50 focus:relative"
            onClick={() => {
              navigate("/admin-panel");
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
