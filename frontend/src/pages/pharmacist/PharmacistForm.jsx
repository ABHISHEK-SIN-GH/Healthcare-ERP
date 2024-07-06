import React, { useEffect, useState } from "react";
import TextInput from "../../components/forms/TextInput";
import EmailInput from "../../components/forms/EmailInput";
import NumberInput from "../../components/forms/NumberInput";
import TextareaInput from "../../components/forms/TextareaInput";
import Button from "../../components/forms/Button";
import DateInput from "../../components/forms/DateInput";
import DropdownInput from "../../components/forms/DropdownInput";
import Password from "../../components/forms/Password";
import { getPharmacist, registerPharmacist, updatePharmacist } from "../../utils/apis/PharmacistApi";
import { useParams } from "react-router-dom";
import { Notify } from "../../utils/notifier";
import { handleValidation } from "../../utils/helpers/Validation";
import { generatePassword } from "../../utils/helpers/Password";

export default function PharmacistForm() {
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

  const [regNo,setRegNo] = useState('');
  const [fname,setFName] = useState('');
  const [lname,setLName] = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');
  const [role,setRole] = useState('pharmacist');
  const [dob,setDob] = useState('');
  const [gender,setGender] = useState('Male');
  const [bloodGrp,setBloodGrp] = useState('A+');
  const [password,setPassword] = useState('');
  const [design,setDesign] = useState('');
  const [qualification,setQualification] = useState('');
  const [address,setAddress] = useState('');
  const [token,setToken] = useState(localStorage.getItem('jwt'));
  
  const handleRegisterPharmacist = async () => {
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
      address,
      username:`${role}@${phone}`,
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await registerPharmacist(data,token);
      console.log(response);
      Notify('success','registered pharmacist successfully');
    } catch (error) {
      console.log(error);    
      Notify('error',error.message.toString());
    }
  } 

  const handleUpdatePharmacist = async () => {
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
      address
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await updatePharmacist(id,data,token);
      console.log(response);
      Notify('success','updated pharmacist data');
    } catch (error) {
      console.log(error);
      Notify('error','error to update pharmacist data');    
    }
  } 

  const loadPharmacist = async (id,token) => {
    try {
      const pharmacist = await getPharmacist(id,token);
      setRegNo(pharmacist.regNo)
      setFName(pharmacist.fname)
      setLName(pharmacist.lname)
      setPhone(pharmacist.phone)
      setEmail(pharmacist.email)
      setDob(pharmacist.dob)
      setGender(pharmacist.gender)
      setBloodGrp(pharmacist.bloodGrp)
      setPassword(pharmacist.password)
      setDesign(pharmacist.design)
      setQualification(pharmacist.qualification)
      setAddress(pharmacist.address)
      Notify('success','loaded pharmacist data');
    } catch (error) {
      console.log(error);
      Notify('error','error to load pharmacist data');
    }
  };

  useEffect(()=>{
    if(id){
      loadPharmacist(id,token);
    }
  },[])

  useEffect(()=>{
    if(dob){
      setPassword(generatePassword(dob));
    }
  },[dob])

  return (
    <>
      <h1 className='text-2xl font-bold text-start mb-6'>{(id)?"Update Pharmacist":"New Pharmacist Registration"}</h1>
      <form className="mt-8 grid grid-cols-6 gap-6">
        <TextInput value={regNo}  label={"Registration Number"} placeholder={"Enter Pharmacist's Registration Number .."} action={setRegNo}/><br className="hidden sm:block"/>
        <TextInput value={fname}  label={"First Name"} placeholder={"Enter Pharmacist's First Name .."} action={setFName}/>
        <TextInput value={lname}  label={"Last Name"} placeholder={"Enter Pharmacist's Last Name .."} action={setLName}/>
        <NumberInput value={phone}  label={"Phone Number"} placeholder={"Enter Pharmacist's Phone No. .."} action={setPhone}/>
        <EmailInput value={email}  label={"Email Address"} placeholder={"Enter Pharmacist's Email Address .."} action={setEmail}/>
        <DateInput value={dob}  label={"Date Of Birth"} placeholder={"Enter Pharmacist's DOB .."} action={setDob}/>
        <DropdownInput  value={gender} label={"Gender"} items={genders} action={setGender}/>
        <DropdownInput  value={bloodGrp} label={"Blood Group"} items={bloodGroups} action={setBloodGrp}/>
        <Password  value={password} label={"Password"} placeholder={"Enter Password .."} action={setPassword}/>
        <TextInput  value={design} label={"Designation"} placeholder={"Enter Pharmacist's Designation .."} action={setDesign}/>
        <TextInput  value={qualification} label={"Qualification"} placeholder={"Enter Pharmacist's Qualification .."} action={setQualification}/>
        <TextareaInput value={address}  label={"Address"} placeholder={"Enter Pharmacist's Address .."} action={setAddress}/>
        {
          (id) ? 
          <Button label={"update"} color={"white"} bgColor={"black"} action={handleUpdatePharmacist}/> :
          <Button label={"submit"} color={"white"} bgColor={"black"} action={handleRegisterPharmacist}/>
        }
        <Button label={"cancel"} color={"white"} bgColor={"gray-400"}/>
      </form>
    </>
  );
}
