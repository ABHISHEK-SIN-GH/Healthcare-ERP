import React, { useEffect, useState } from "react";
import TextInput from "../../components/forms/TextInput";
import EmailInput from "../../components/forms/EmailInput";
import NumberInput from "../../components/forms/NumberInput";
import TextareaInput from "../../components/forms/TextareaInput";
import Button from "../../components/forms/Button";
import DateInput from "../../components/forms/DateInput";
import DropdownInput from "../../components/forms/DropdownInput";
import Password from "../../components/forms/Password";
import { getFrontdesk, registerFrontdesk, updateFrontdesk } from "../../utils/apis/FrontdeskApi";
import { useParams } from "react-router-dom";
import { Notify } from "../../utils/notifier";
import { handleValidation } from "../../utils/helpers/Validation";
import { generatePassword } from "../../utils/helpers/Password";

export default function ReceptionistForm() {
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
    { name: "NA", value: "NA" },
  ];

  const [fname,setFName] = useState('');
  const [lname,setLName] = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');
  const [role,setRole] = useState('frontdesk');
  const [dob,setDob] = useState('');
  const [gender,setGender] = useState('Male');
  const [bloodGrp,setBloodGrp] = useState('A+');
  const [password,setPassword] = useState('');
  const [design,setDesign] = useState('');
  const [qualification,setQualification] = useState('');
  const [address,setAddress] = useState('');
  const [token,setToken] = useState(localStorage.getItem('jwt'));
  
  const handleRegisterFrontdesk = async () => {
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
      address,
      username:`${role}@${phone}`,
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await registerFrontdesk(data,token);
      console.log(response);
      Notify('success','registered frontdesk successfully');
    } catch (error) {
      console.log(error);    
      Notify('error',error.message.toString());
    }
  } 

  const handleUpdateFrontdesk = async () => {
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
      address
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await updateFrontdesk(id,data,token);
      console.log(response);
      Notify('success','updated frontdesk data');
    } catch (error) {
      console.log(error);
      Notify('error','error to update frontdesk data');    
    }
  } 

  const loadFrontdesk = async (id,token) => {
    try {
      const user = await getFrontdesk(id,token);
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
      setAddress(user.address)
      Notify('success','loaded frontdesk data');
    } catch (error) {
      console.log(error);
      Notify('error','error to load frontdesk data');
    }
  };

  useEffect(()=>{
    if(id){
      loadFrontdesk(id,token);
    }
  },[])

  useEffect(()=>{
    if(dob){
      setPassword(generatePassword(dob));
    }
  },[dob])

  return (
    <>
      <h1 className='text-2xl font-bold text-start mb-6'>{(id)?"Update Frontdesk":"New Frontdesk Registration"}</h1>
      <form className="mt-8 grid grid-cols-6 gap-6">
        <TextInput value={fname} label={"First Name"} placeholder={"Enter Frontdesk's First Name .."} action={setFName}/>
        <TextInput value={lname} label={"Last Name"} placeholder={"Enter Frontdesk's Last Name .."} action={setLName}/>
        <NumberInput value={phone} label={"Phone Number"} placeholder={"Enter Frontdesk's Phone No. .."} action={setPhone}/>
        <EmailInput value={email} label={"Email Address"} placeholder={"Enter Frontdesk's Email Address .."} action={setEmail}/>
        <DateInput value={dob} label={"Date Of Birth"} placeholder={"Enter Frontdesk's DOB .."} action={setDob}/>
        <DropdownInput value={gender} label={"Gender"} items={genders} action={setGender}/>
        <DropdownInput value={bloodGrp} label={"Blood Group"} items={bloodGroups} action={setBloodGrp}/>
        <Password value={password} label={"Password"} placeholder={"Enter Password .."} action={setPassword}/>
        <TextInput value={design} label={"Designation"} placeholder={"Enter Frontdesk's Designation .."} action={setDesign}/>
        <TextInput value={qualification} label={"Qualification"} placeholder={"Enter Frontdesk's Qualification .."} action={setQualification}/>
        <TextareaInput value={address} label={"Address"} placeholder={"Enter Frontdesk's Address .."} action={setAddress}/>
        {
          (id) ? 
          <Button label={"update"} color={"white"} bgColor={"black"} action={handleUpdateFrontdesk}/> :
          <Button label={"submit"} color={"white"} bgColor={"black"} action={handleRegisterFrontdesk}/>
        }
        <Button label={"cancel"} color={"white"} bgColor={"gray-400"}/>
      </form>
    </>
  );
}
