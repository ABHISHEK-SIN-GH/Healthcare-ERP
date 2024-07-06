import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/forms/TextInput";
import EmailInput from "../../components/forms/EmailInput";
import NumberInput from "../../components/forms/NumberInput";
import TextareaInput from "../../components/forms/TextareaInput";
import FileInput from "../../components/forms/FileInput";
import Button from "../../components/forms/Button";
import DateInput from "../../components/forms/DateInput";
import RadioInput from "../../components/forms/RadioInput";
import DropdownInput from "../../components/forms/DropdownInput";
import { useParams } from "react-router-dom";
import { Notify } from "../../utils/notifier";
import { getIPDPatient, registerIPDPatient, updateIPDPatient } from "../../utils/apis/IPDPatientApi";
import { handleValidation } from "../../utils/helpers/Validation";
import { generatePassword } from "../../utils/helpers/Password";
import { getAllDoctor } from "../../utils/apis/DoctorApi";
import DropdownInputID from "../../components/forms/DropdownInputID";

export default function IPDForm() {
  const {id} = useParams();

  const navigate = useNavigate();

  const printData = (data) =>{
    navigate('/print-page',{state:data});
  }
  
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

  const doctors = [
    { name: "Incharge Doctor", value: "Incharge Doctor" },
    { name: "Attending Doctor", value: "Attending Doctor" }
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

  const wards = [
    { name: 'General Ward', value: 'General Ward' },
    { name: 'Semi-Private Ward', value: 'Semi-Private Ward' },
    { name: 'Private Ward', value: 'Private Ward' },
    { name: 'Intensive Care Unit (ICU)', value: 'Intensive Care Unit (ICU)' },
    { name: 'Neonatal Intensive Care Unit (NICU)', value: 'Neonatal Intensive Care Unit (NICU)' },
    { name: 'Pediatric Ward', value: 'Pediatric Ward' },
    { name: 'Maternity Ward', value: 'Maternity Ward' },
    { name: 'Surgical Ward', value: 'Surgical Ward' },
    { name: 'Orthopedic Ward', value: 'Orthopedic Ward' },
    { name: 'Cardiology Ward', value: 'Cardiology Ward' },
    { name: 'Neurology Ward', value: 'Neurology Ward' },
    { name: 'Oncology Ward', value: 'Oncology Ward' },
    { name: 'Psychiatry Ward', value: 'Psychiatry Ward' },
    { name: 'Emergency Ward', value: 'Emergency Ward' },
    { name: 'Burn Ward', value: 'Burn Ward' }
  ];

  const [fname,setFName] = useState('');
  const [lname,setLName] = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('NA');
  const [role,setRole] = useState('patient');
  const [dob,setDob] = useState('');
  const [gender,setGender] = useState('Male');
  const [address,setAddress] = useState('');
  const [newPatient,setNewPatient] = useState('Yes');
  const [opdIpd,setOpdIpd] = useState('ipd');
  const [bloodGrp,setBloodGrp] = useState('A+');
  const [bloodPressure,setBloodPressure] = useState('NA');
  const [height,setHeight] = useState('NA');
  const [weight,setWeight] = useState('NA');
  const [symptoms,setSymptoms] = useState('NA');
  const [depart,setDepart] = useState('General Medicine');
  const [consultant,setConsultant] = useState('');
  const [attendingConsultant,setAttendingConsultant] = useState('');
  const [allDoctors,setAllDoctors] = useState([]);
  const [ward,setWard] = useState('General Ward');
  const [bed,setBed] = useState('');
  const [notes,setNotes] = useState('NA');
  const [charges,setCharges] = useState('');
  const [paymentMethod,setPaymentMethod] = useState('Cash');
  const [token,setToken] = useState(localStorage.getItem('jwt'));
  
  const handleRegisterIPDPatient = async () => {
    const data = {
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      address,
      newPatient,
      opdIpd,
      bloodGrp,
      bloodPressure,
      height,
      weight,
      symptoms,
      depart,
      consultant,
      attendingConsultant,
      ward,
      bed,
      notes,
      charges,
      paymentMethod,
      password:generatePassword(dob),
      username:`${role}@${phone}`,
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await registerIPDPatient(data,token);
      console.log(response);
      Notify('success','registered patient successfully');
      setTimeout(()=>{
        printData(data);
      },2000)
    } catch (error) {
      console.log(error);    
      Notify('error',error.message.toString());
    }
  } 

  const handleUpdateIPDPatient = async () => {
    const data = {
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      address,
      newPatient,
      opdIpd,
      bloodGrp,
      bloodPressure,
      height,
      weight,
      symptoms,
      depart,
      consultant,
      attendingConsultant,
      ward,
      bed,
      notes,
      charges,
      paymentMethod,
      username:`${role}@${phone}`,
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await updateIPDPatient(id,data,token);
      console.log(response);
      Notify('success','updated patient data');
    } catch (error) {
      console.log(error);
      Notify('error','error to update patient data');    
    }
  } 

  const loadIPDPatient = async (id,token) => {
    try {
      const patient = await getIPDPatient(id,token);
      setFName(patient.fname)
      setLName(patient.lname)
      setPhone(patient.phone)
      setEmail(patient.email)
      setDob(patient.dob)
      setGender(patient.gender)
      setAddress(patient.address)
      setNewPatient(patient.newPatient)
      setOpdIpd(patient.opdIpd)
      setBloodGrp(patient.bloodGrp)
      setBloodPressure(patient.bloodPressure)
      setHeight(patient.height)
      setWeight(patient.weight)
      setSymptoms(patient.symptoms)
      setDepart(patient.depart)
      setConsultant(patient.consultant)
      setAttendingConsultant(patient.attendingConsultant)
      setWard(patient.ward)
      setBed(patient.bed)
      setNotes(patient.notes)
      setCharges(patient.charges)
      setPaymentMethod(patient.paymentMethod)
      Notify('success','loaded patient data');
    } catch (error) {
      console.log(error);
      Notify('error','error to load patient data');
    }
  };

  const loadAllDoctors = async (token) => {
    let allDocs = await getAllDoctor(token);  
    let allDocsName = [];
    allDocs.forEach((doc)=>{
      allDocsName.push({name:`Dr. ${doc.fname}`,value:doc._id});
    });
    allDocsName.push({name:'Others',value:'Others'});
    setAllDoctors(allDocsName);
    if(!id){
      setConsultant(allDocsName[0]);
      setAttendingConsultant(allDocsName[0]);
    }
  }

  useEffect(()=>{
    if(id){
      loadIPDPatient(id,token);
    }
    loadAllDoctors(token);
  },[])

  return (
    <>
      <h1 className='text-2xl font-bold text-start mb-6'>{(id)?"Update IPD Patient":"IPD Patient Registration"}</h1>
      <form className="mt-8 grid grid-cols-6 gap-6">
        <TextInput value={fname} action={setFName} label={"Patient First Name"} placeholder={"Enter Patient First Name .."}/>
        <TextInput value={lname} action={setLName} label={"Patient Last Name"} placeholder={"Enter Patient Last Name .."}/>
        <NumberInput value={phone} action={setPhone} label={"Patient Phone Number"} placeholder={"Enter Patient Phone No. .."}/>
        <EmailInput value={email} action={setEmail} label={"Patient Email Address"} placeholder={"Enter Patient Email Address .."}/>
        <DateInput value={dob} action={setDob} label={"Patient Date Of Birth"} placeholder={"Enter Patient DOB .."}/>
        <DropdownInput value={gender} action={setGender} label={"Patient Gender"} items={genders}/>
        <TextareaInput value={address} action={setAddress} label={"Patient Address"} placeholder={"Enter Patient Address .."}/>
        <DropdownInput value={newPatient} action={setNewPatient} label={"Is New Patient"} items={[{name:"Yes",value:"Yes"},{name:"No",value:"No"}]}/>
        <DropdownInput value={opdIpd} action={setOpdIpd} label={"OPD / IPD"} items={[{name:"Ipd",value:"Ipd"}]}/>
        <DropdownInput value={bloodGrp} action={setBloodGrp} label={"Patient Blood Group"} items={bloodGroups}/>
        <TextInput value={bloodPressure} action={setBloodPressure} label={"Patient Blood Pressure"} placeholder={"Enter Patient Blood Pressure .."}/>
        <TextInput value={height} action={setHeight} label={"Patient Height (in cm)"} placeholder={"Enter Patient Height .."}/>
        <TextInput value={weight} action={setWeight} label={"Patient Weight (in kg)"} placeholder={"Enter Patient Weight .."}/>
        <TextareaInput value={symptoms} action={setSymptoms} label={"Patient's Symptoms"} placeholder={"Enter Patient's Symptoms .."}/>
        <DropdownInput value={depart} action={setDepart} label={"Select Department"} items={departments}/> <br className="hidden sm:block"/>
        <DropdownInputID value={consultant} action={setConsultant} label={"InCharge Doctor"} items={allDoctors}/>
        <DropdownInputID value={attendingConsultant} action={setAttendingConsultant} label={"Attending Doctor"} items={allDoctors}/>
        <DropdownInput value={ward} action={setWard} label={"Select Ward"} items={wards}/>
        <NumberInput value={bed} action={setBed} label={"Bed Number"} placeholder={"Enter Bed Number .."}/>
        <TextareaInput value={notes} action={setNotes} label={"Notes"} placeholder={"Enter Notes .."}/>
        <NumberInput value={charges} action={setCharges} label={"Standard Charges"} placeholder={"Enter Standard Charges .."}/>
        <DropdownInput value={paymentMethod} action={setPaymentMethod} label={"Payment Mode"} items={[{name:"Cash",value:"Cash"},{name:"Online Payment",value:"Online Payment"},,{name:"Cheque",value:"Cheque"}]}/>
        {
          (id) ?
          <Button action={handleUpdateIPDPatient} label={"update"} color={"white"} bgColor={"black"}/>:
          <Button action={handleRegisterIPDPatient} label={"submit"} color={"white"} bgColor={"black"} submit={printData}/>
        }
        <Button label={"cancel"} color={"white"} bgColor={"gray-400"}/>
      </form>
    </>
  );
}
