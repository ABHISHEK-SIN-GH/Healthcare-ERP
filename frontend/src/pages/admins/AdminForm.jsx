import React, { useEffect, useState } from "react";
import TextInput from "../../components/forms/TextInput";
import EmailInput from "../../components/forms/EmailInput";
import NumberInput from "../../components/forms/NumberInput";
import Button from "../../components/forms/Button";
import DateInput from "../../components/forms/DateInput";
import DropdownInput from "../../components/forms/DropdownInput";
import Password from "../../components/forms/Password";
import { getAdmin, registerAdmin, updateAdmin } from "../../utils/apis/AdminApi";
import { useParams } from "react-router-dom";
import { Notify } from "../../utils/notifier";
import { handleValidation } from "../../utils/helpers/Validation";
import { generatePassword } from "../../utils/helpers/Password";

export default function AdminForm() {
  const {id} = useParams();

  const genders = [
    {name:"Male",value:"Male"},
    {name:"Female",value:"Female"},
    {name:"Others",value:"Others"}
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
    { name: "NA", value: "NA" }
  ];

  const [fname,setFName] = useState('');
  const [lname,setLName] = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');
  const [role,setRole] = useState('admin');
  const [dob,setDob] = useState('');
  const [gender,setGender] = useState('Male');
  const [bloodGrp,setBloodGrp] = useState('A+');
  const [password,setPassword] = useState('');
  const [design,setDesign] = useState('');
  const [qualification,setQualification] = useState('');
  const [token,setToken] = useState(localStorage.getItem('jwt'));
  
  const handleRegisterAdmin = async () => {
    const data = {
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
      username:`${role}@${phone}`,
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await registerAdmin(data,token);
      console.log(response);
      Notify('success','registered admin successfully');
    } catch (error) {
      console.log(error);    
      Notify('error',error.message.toString());
    }
  } 

  const handleUpdateAdmin = async () => {
    const data = {
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      bloodGrp,
      password,
      design,
      qualification
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await updateAdmin(id,data,token);
      console.log(response);
      Notify('success','updated admin data');
    } catch (error) {
      console.log(error);
      Notify('error','error to update admin data');    
    }
  } 

  const loadAdmin = async (id,token) => {
    try {
      const user = await getAdmin(id,token);
      console.log(user);
      setFName(user.fname)
      setLName(user.lname)
      setPhone(user.phone)
      setEmail(user.email)
      setDob(user.dob)
      setGender(user.gender)
      setBloodGrp(user.bloodGrp)
      setPassword(user.password)
      setDesign(user.design)
      setQualification(user.qualification)
      Notify('success','loaded admin data');
    } catch (error) {
      console.log(error);
      Notify('error','error to loaded admin data');
    }
  };

  useEffect(()=>{
    if(id){
      loadAdmin(id,token);
    }
  },[])

  useEffect(()=>{
    if(dob){
      setPassword(generatePassword(dob));
    }
  },[dob])

  return (
    <>
      <h1 className='text-2xl font-bold text-start mb-6'>{(id)?"Update Admin":"New Admin Registration"}</h1>
      <form className="mt-8 grid grid-cols-6 gap-6">
        <TextInput value={fname} label={"First Name"} placeholder={"Enter Admin's First Name .."} action={setFName}/>
        <TextInput value={lname} label={"Last Name"} placeholder={"Enter Admin's Last Name .."} action={setLName}/>
        <NumberInput value={phone} label={"Phone Number"} placeholder={"Enter Admin's Phone No. .."} action={setPhone}/>
        <EmailInput value={email} label={"Email Address"} placeholder={"Enter Admin's Email Address .."} action={setEmail}/>
        <DateInput value={dob} label={"Date Of Birth"} placeholder={"Enter Admin's DOB .."} action={setDob}/>
        <DropdownInput value={gender} label={"Gender"} items={genders} action={setGender}/>
        <DropdownInput value={bloodGrp} label={"Blood Group"} items={bloodGroups} action={setBloodGrp}/>
        <Password value={password} label={"Password"} placeholder={"Enter Password .."} action={setPassword}/>
        <TextInput value={design} label={"Designation"} placeholder={"Enter Admin's Designation .."} action={setDesign}/>
        <TextInput value={qualification} label={"Qualification"} placeholder={"Enter Admin's Qualification .."} action={setQualification}/>
        {
          (id) ? 
          <Button label={"update"} color={"white"} bgColor={"black"} action={handleUpdateAdmin}/> :
          <Button label={"submit"} color={"white"} bgColor={"black"} action={handleRegisterAdmin}/>
        }
        <Button label={"cancel"} color={"white"} bgColor={"gray-400"}/>
      </form>
    </>
  );
}
