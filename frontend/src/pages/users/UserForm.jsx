import React, { useEffect, useState } from "react";
import TextInput from "../../components/forms/TextInput";
import EmailInput from "../../components/forms/EmailInput";
import NumberInput from "../../components/forms/NumberInput";
import Button from "../../components/forms/Button";
import DateInput from "../../components/forms/DateInput";
import DropdownInput from "../../components/forms/DropdownInput";
import { getUser, registerUser, updateUser } from "../../utils/apis/UserApi";
import { useParams } from "react-router-dom";
import { Notify } from "../../utils/notifier";
import { handleValidation } from "../../utils/helpers/Validation";
import { generatePassword } from "../../utils/helpers/Password";

export default function UserForm() {
  const {id} = useParams();
  
  const roles = [
    {name:"Admin",value:"admin"},
    {name:"Doctor",value:"doctor"},
    {name:"Nurse",value:"nurse"},
    {name:"Frontdesk",value:"frontdesk"},
    {name:"Pharmacist",value:"pharmacist"},
    {name:"Patient",value:"patient"}
  ];
  
  const [fname,setFName] = useState('');
  const [lname,setLName] = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');
  const [dob,setDob] = useState('');
  const [role,setRole] = useState('admin');
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  const handleRegisterUser = async () => {
    const ddmmyyyy = generatePassword(dob)
    const data = {
      fname,
      lname,
      phone,
      email,
      dob,
      role,
      password:`${ddmmyyyy}`,
      username:`${role}@${phone}`,
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await registerUser(data,token);
      console.log(response);
      Notify('success','registered user successfully');
    } catch (error) {
      console.log(error);    
      Notify('error',error.message.toString());
    }
  } 

  const handleUpdateUser = async () => {
    const data = {
      fname,
      lname,
      phone,
      email,
      dob,
      role
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await updateUser(id,data,token);
      console.log(response);
      Notify('success','updated user data');
    } catch (error) {
      console.log(error);
      Notify('error','error to update user data');    
    }
  } 

  const loadUser = async (id,token) => {
    try {
      const user = await getUser(id,token);
      setFName(user.fname)
      setLName(user.lname)
      setPhone(user.phone)
      setEmail(user.email)
      setDob(user.dob)
      setRole(user.role)
      Notify('success','loaded user data');
    } catch (error) {
      console.log(error);
      Notify('error','error to load user data');
    }
  };

  useEffect(()=>{
    if(id){
      loadUser(id,token);
    }
  },[])

  return (
    <>
      <h1 className='text-2xl font-bold text-start mb-6'>{(id)?"Update User":"New User Registration"}</h1>
      <form className="mt-8 grid grid-cols-6 gap-6">
        <TextInput label={"First Name"} value={fname} placeholder={"Enter User's First Name .."} action={setFName}/>
        <TextInput label={"Last Name"} value={lname} placeholder={"Enter User's Last Name .."} action={setLName}/>
        <NumberInput label={"Phone Number"} value={phone} placeholder={"Enter User's Phone No. .."} action={setPhone}/>
        <EmailInput label={"Email Address"} value={email} placeholder={"Enter User's Email Address .."} action={setEmail}/>
        <DateInput label={"Date Of Birth"} value={dob} placeholder={"Enter User's DOB .."} action={setDob}/>
        <DropdownInput label={"Role"} value={role} items={roles} action={setRole}/>
        {
          (id) ? 
          <Button label={"update"} color={"white"} bgColor={"black"} action={handleUpdateUser}/> :
          <Button label={"submit"} color={"white"} bgColor={"black"} action={handleRegisterUser}/> 
        }
        <Button label={"cancel"} color={"white"} bgColor={"gray-400"} action={null}/>
      </form>
    </>
  );
}
