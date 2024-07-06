import React, { useEffect, useState } from "react";
import TextInput from "../../components/forms/TextInput";
import EmailInput from "../../components/forms/EmailInput";
import NumberInput from "../../components/forms/NumberInput";
import TextareaInput from "../../components/forms/TextareaInput";
import Button from "../../components/forms/Button";
import DateInput from "../../components/forms/DateInput";
import DropdownInput from "../../components/forms/DropdownInput";
import Password from "../../components/forms/Password";
import { getNurse, registerNurse, updateNurse } from "../../utils/apis/NurseApi";
import { useParams } from "react-router-dom";
import { Notify } from "../../utils/notifier";
import { handleValidation } from "../../utils/helpers/Validation";
import { generatePassword } from "../../utils/helpers/Password";

export default function NurseForm() {
  const {id} = useParams();
  
  const genders = [
    {name:"Female",value:"Female"},
    {name:"Male",value:"Male"},
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
  const [role,setRole] = useState('nurse');
  const [dob,setDob] = useState('');
  const [gender,setGender] = useState('Female');
  const [bloodGrp,setBloodGrp] = useState('A+');
  const [password,setPassword] = useState('');
  const [design,setDesign] = useState('');
  const [qualification,setQualification] = useState('');
  const [depart,setDepart] = useState('General Medicine');
  const [address,setAddress] = useState('');
  const [token,setToken] = useState(localStorage.getItem('jwt'));
  
  const handleRegisterNurse = async () => {
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
      depart,
      address,
      username:`${role}@${phone}`,
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await registerNurse(data,token);
      console.log(response);
      Notify('success','registered nurse successfully');
    } catch (error) {
      console.log(error);    
      Notify('error',error.message.toString());
    }
  } 

  const handleUpdateNurse = async () => {
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
      depart,
      address
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await updateNurse(id,data,token);
      console.log(response);
      Notify('success','updated nurse data');
    } catch (error) {
      console.log(error);
      Notify('error','error to update nurse data');    
    }
  } 

  const loadNurse = async (id,token) => {
    try {
      const nurse = await getNurse(id,token);
      setRegNo(nurse.regNo)
      setFName(nurse.fname)
      setLName(nurse.lname)
      setPhone(nurse.phone)
      setEmail(nurse.email)
      setDob(nurse.dob)
      setGender(nurse.gender)
      setBloodGrp(nurse.bloodGrp)
      setPassword(nurse.password)
      setDesign(nurse.design)
      setQualification(nurse.qualification)
      setDepart(nurse.depart)
      setAddress(nurse.address)
      Notify('success','loaded nurse data');
    } catch (error) {
      console.log(error);
      Notify('error','error to load nurse data');
    }
  };

  useEffect(()=>{
    if(id){
      loadNurse(id,token);
    }
  },[])

  useEffect(()=>{
    if(dob){
      setPassword(generatePassword(dob));
    }
  },[dob])

  return (
    <>
      <h1 className='text-2xl font-bold text-start mb-6'>{(id)?"Update Nurse":"New Nurse Registration"}</h1>
      <form className="mt-8 grid grid-cols-6 gap-6">
        <TextInput value={regNo} label={"Registration Number"} placeholder={"Enter Nurse's Registration Number .."} action={setRegNo}/>
        <TextInput value={fname} label={"First Name"} placeholder={"Enter Nurse's First Name .."} action={setFName}/>
        <TextInput value={lname} label={"Last Name"} placeholder={"Enter Nurse's Last Name .."} action={setLName}/>
        <NumberInput value={phone} label={"Phone Number"} placeholder={"Enter Nurse's Phone No. .."} action={setPhone}/>
        <EmailInput value={email} label={"Email Address"} placeholder={"Enter Nurse's Email Address .."} action={setEmail}/>
        <DateInput value={dob} label={"Date Of Birth"} placeholder={"Enter Nurse's DOB .."} action={setDob}/>
        <DropdownInput value={gender} label={"Gender"} items={genders} action={setGender}/>
        <DropdownInput value={bloodGrp} label={"Blood Group"} items={bloodGroups} action={setBloodGrp}/>
        <Password value={password} label={"Password"} placeholder={"Enter Password .."} action={setPassword}/>
        <TextInput value={design} label={"Designation"} placeholder={"Enter Nurse's Designation .."} action={setDesign}/>
        <TextInput value={qualification} label={"Qualification"} placeholder={"Enter Nurse's Qualification .."} action={setQualification}/>
        <DropdownInput value={depart} label={"Select Department"} items={departments} action={setDepart}/>
        <TextareaInput value={address} label={"Address"} placeholder={"Enter Nurse's Address .."} action={setAddress}/>
        {
          (id) ?
          <Button label={"update"} color={"white"} bgColor={"black"} action={handleUpdateNurse}/> :
          <Button label={"submit"} color={"white"} bgColor={"black"} action={handleRegisterNurse}/> 
        }
        <Button label={"cancel"} color={"white"} bgColor={"gray-400"}/>
      </form>
    </>
  );
}
