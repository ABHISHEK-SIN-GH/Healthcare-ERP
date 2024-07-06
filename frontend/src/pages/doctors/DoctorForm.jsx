import React, { useEffect, useState } from "react";
import TextInput from "../../components/forms/TextInput";
import EmailInput from "../../components/forms/EmailInput";
import NumberInput from "../../components/forms/NumberInput";
import TextareaInput from "../../components/forms/TextareaInput";
import Button from "../../components/forms/Button";
import DateInput from "../../components/forms/DateInput";
import DropdownInput from "../../components/forms/DropdownInput";
import Password from "../../components/forms/Password";
import { useParams } from "react-router-dom";
import { Notify } from "../../utils/notifier";
import { getDoctor, registerDoctor, updateDoctor } from "../../utils/apis/DoctorApi";
import { handleValidation } from "../../utils/helpers/Validation";
import { generatePassword } from "../../utils/helpers/Password";

export default function DoctorForm() {
  const {id} = useParams();

  const genders = [
    {name:"Male",value:"Male"},
    {name:"Female",value:"Female"},
    {name:"Others",value:"Others"}
  ];

  const departments = [
    { name: "General Medicine", value: "General Medicine" },
    { name: "Plastic Surgery", value: "Plastic Surgery" },
    { name: "Anaesthesiology & Clinical Care", value: "Anaesthesiology & Clinical Care" },
    { name: "General & Laparoscopic Surgery", value: "General & Laparoscopic Surgery" },
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
    { name: "Dental", value: "Dental" }
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
    { name: "NA", value: "NA" },
  ];

  const [regNo,setRegNo] = useState('');
  const [fname,setFName] = useState('');
  const [lname,setLName] = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');
  const [role,setRole] = useState('doctor');
  const [dob,setDob] = useState('');
  const [gender,setGender] = useState('Male');
  const [bloodGrp,setBloodGrp] = useState('A+');
  const [password,setPassword] = useState('');
  const [design,setDesign] = useState('');
  const [qualification,setQualification] = useState('');
  const [specialty,setSpecialty] = useState('');
  const [depart,setDepart] = useState('General Medicine');
  const [address,setAddress] = useState('');
  const [token,setToken] = useState(localStorage.getItem('jwt'));
  
  const handleRegisterDoctor = async () => {
    const data = {
      regNo,
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      bloodGrp,
      password,
      design,
      qualification,
      specialty,
      depart,
      address,
      username:`${role}@${phone}`,
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await registerDoctor(data,token);
      console.log(response);
      Notify('success','registered doctor successfully');
    } catch (error) {
      console.log(error);    
      Notify('error',error.message.toString());
    }
  } 

  const handleUpdateDoctor = async () => {
    const data = {
      regNo,
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      bloodGrp,
      password,
      design,
      qualification,
      specialty,
      depart,
      address
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await updateDoctor(id,data,token);
      console.log(response);
      Notify('success','updated doctor data');
    } catch (error) {
      console.log(error);
      Notify('error','error to update doctor data');    
    }
  } 

  const loadDoctor = async (id,token) => {
    try {
      const doctor = await getDoctor(id,token);
      setRegNo(doctor.regNo)
      setFName(doctor.fname)
      setLName(doctor.lname)
      setPhone(doctor.phone)
      setEmail(doctor.email)
      setDob(doctor.dob)
      setGender(doctor.gender)
      setBloodGrp(doctor.bloodGrp)
      setPassword(doctor.password)
      setDesign(doctor.design)
      setQualification(doctor.qualification)
      setSpecialty(doctor.specialty)
      setDepart(doctor.depart)
      setAddress(doctor.address)
      Notify('success','loaded doctor data');
    } catch (error) {
      console.log(error);
      Notify('error','error to load doctor data');
    }
  };

  useEffect(()=>{
    if(id){
      loadDoctor(id,token);
    }
  },[])

  useEffect(()=>{
    if(dob){
      setPassword(generatePassword(dob));
    }
  },[dob])

  return (
    <>
      <h1 className='text-2xl font-bold text-start mb-6'>{(id)?"Update Doctor":"New Doctor Registration"}</h1>
      <form className="mt-8 grid grid-cols-6 gap-6">
        <TextInput value={regNo} label={"Registration Number"} placeholder={"Enter Doctor's Registration Number .."} action={setRegNo}/><br className="hidden sm:block"/>
        <TextInput value={fname} label={"First Name"} placeholder={"Enter Doctor's First Name .."} action={setFName}/>
        <TextInput value={lname} label={"Last Name"} placeholder={"Enter Doctor's Last Name .."} action={setLName}/>
        <NumberInput value={phone} label={"Phone Number"} placeholder={"Enter Doctor's Phone No. .."} action={setPhone}/>
        <EmailInput value={email} label={"Email Address"} placeholder={"Enter Doctor's Email Address .."} action={setEmail}/>
        <DateInput value={dob} label={"Date Of Birth"} placeholder={"Enter Doctor's DOB .."} action={setDob}/>
        <DropdownInput value={gender} label={"Gender"} items={genders} action={setGender}/>
        <DropdownInput value={bloodGrp} label={"Blood Group"} items={bloodGroups} action={setBloodGrp}/>
        <Password value={password} label={"Password"} placeholder={"Enter Password .."} action={setPassword}/>
        <TextInput value={design} label={"Designation"} placeholder={"Enter Doctor's Designation .."} action={setDesign}/>
        <TextInput value={qualification} label={"Qualification"} placeholder={"Enter Doctor's Qualification .."} action={setQualification}/>
        <TextInput value={specialty} label={"Specialist"} placeholder={"Enter Doctor's Specialty .."} action={setSpecialty}/>
        <DropdownInput value={depart} label={"Select Department"} items={departments} action={setDepart}/>
        <TextareaInput value={address} label={"Address"} placeholder={"Enter Doctor's Address .."} action={setAddress}/>
        {
          (id) ? 
          <Button label={"update"} color={"white"} bgColor={"black"} action={handleUpdateDoctor}/> :
          <Button label={"submit"} color={"white"} bgColor={"black"} action={handleRegisterDoctor}/>
        }
        <Button label={"cancel"} color={"white"} bgColor={"gray-400"}/>
      </form>
    </>
  );
}
