import React, { useState , useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { getPatientTreatments, addPatientTreatments, updatePatientTreatments } from "../../utils/apis/PatientDetailsApi";
import { useParams } from "react-router-dom";
import { uploadFile } from "../../utils/apis/UploadApi";
import { API_ROUTES } from "../../utils/routes";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';

const treatment1 = ["2024-04-01", "08:00", "120/80 mmHg", "70 bpm", "98%", "36.5°C", "90 mg/dL"]

const ThreadBox = ({Id,TreatmentId,Status,Name,Time,Date,Text,Img,Treatment,handleExpireTreatment}) => {
  return (
    <div class={(Status)?"flex items-start gap-4 mb-4 cursor-pointer":"flex items-start gap-4 mb-4 opacity-80"} onClick={()=>{(Status)?handleExpireTreatment(Id,TreatmentId):''}}>
      <div class="flex flex-col gap-1 w-full">
          <div class="flex flex-col items-start justify-between space-x-2">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">{Name}<br/>{Time} | {Date}</span>
          </div>
          <div class="relative flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 h-full sm:h-52 overflow-y-auto">
            {
              (Img) ?
              <div class="group relative w-full border rounded-lg sm:h-56">
                <img src={`${API_ROUTES.STATIC}/patients/${Img.fileName}`} title={Img.caption} class="rounded-lg" />
              </div> : ''
            }
            {
              (Treatment) ? 
              <div class="text-sm font-normal text-gray-900 dark:text-white">
                <small><b>Parameter | Value</b></small> <hr className="my-1"/>
                <small><b>BP:</b> {Treatment.bp}</small> <hr className="my-1"/>
                <small><b>Pulse:</b> {Treatment.pulse}</small> <hr className="my-1"/>
                <small><b>SPO2:</b> {Treatment.spo2}</small> <hr className="my-1"/>
                <small><b>Temp:</b> {Treatment.temp}</small> <hr className="my-1"/>
                <small><b>Blood/Sugar:</b> {Treatment.bs}</small>
              </div> : ''
            }
            {
              (Text) ? 
              <p class="text-sm font-normal text-gray-900 dark:text-white">{Text.text}</p> 
              : ''
            }
            {
              (!Status) ?
              <h1 className="text-2xl text-red-500 font-bold absolute top-1/2 left-1/2 -rotate-[30deg] -translate-x-1/2 -translate-y-1/2">Invalid</h1> :
              ''
            }
        </div>
      </div>
    </div>
  );
}

export default function PatientTreatmentPlan() {

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          hideFileModal();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  let toastId;

  const {id} = useParams();
  const [token,setToken] = useState(localStorage.getItem('jwt'));
  const [user,setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.fname : '');
  const [treatments,setTreatments] = useState([]);
  const [treatmentsData,setTreatmentsData] = useState([]);
  const [treatmentId, setTreatmentId] = useState('');

  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState(null);
  const fileRef = useRef(null);
  const fileBoxRef = useRef(null);
  useOutsideAlerter(fileBoxRef);
  const [fileModal,setFileModal] = useState(false);
  
  const handleFileSelect = () => {
    const file = fileRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        setImageFile(file);
        setFileModal(true);
      };
      reader.readAsDataURL(file);
    }
  };
  const hideFileModal = () => {
    setFileModal(false);
    setImageSrc(null);
    setCaption('');
    fileRef.current.value = null;
  }
  const handleSaveFile = async () => {
    toastId = toast.loading("Please wait...");
    const date = new Date();
    const vid = uuidv4();
    const fileName = vid+'.'+imageFile.name.split('.')[1];
    const formData = new FormData();
    formData.append('payload',fileName);
    formData.append('patientImage',imageFile);
    try {
      const response = await uploadFile(formData,token);
      if(response){
        const bodyData = {
          vid,
          user,
          date:date.toLocaleDateString(),
          time:date.toLocaleTimeString(),
          status:true,
          type:'file',
          fileName:response.payload,
          caption
        }
        setTreatments([bodyData,...treatments]);
        if(treatmentsData.length==0){
          addTreatments(JSON.stringify([bodyData,...treatments]));
        }else{
          updateTreatments(id,treatmentsData[0]._id,JSON.stringify([bodyData,...treatments]));
        }
        hideFileModal();
        toast.update(toastId, { render: "Loaded Successfully..", type: "success", isLoading:false});
        toast.dismiss(toastId);
      }
    } catch (error) {
      console.log(error);
      toast.update(toastId, { render: "Loaded Failed..", type: "error", isLoading:false});
      toast.dismiss(toastId);
    }
  }

  const [text,setText] = useState('');
  const handleSaveText = async () => {
    if(!text){
      toastId = toast.loading("Textbox is empty..");
      setTimeout(()=>{
        toast.dismiss(toastId);
      },1000)  
      return;
    }
    toastId = toast.loading("Please wait...");
    if(text.length==0){
      return;
    }
    const date = new Date();
    const vid = uuidv4();
    const bodyData = {
      vid,
      user,
      date:date.toLocaleDateString(),
      time:date.toLocaleTimeString(),
      status:true,
      type:'text',
      text
    }
    setTreatments([bodyData,...treatments]);
    if(treatmentsData.length==0){
      addTreatments(JSON.stringify([bodyData,...treatments]));
    }else{
      updateTreatments(id,treatmentsData[0]._id,JSON.stringify([bodyData,...treatments]));
    }
    setText('');
    toast.update(toastId, { render: "Loaded Successfully..", type: "success", isLoading:false});
    toast.dismiss(toastId);
  } 

  const loadAllTreatments = async () => {
    try {
      const response = await getPatientTreatments(id,token);
      setTreatmentsData(response);
      setTreatments(JSON.parse(response[0]?.patientTreatments));
      setTreatmentId(response[0]._id);
    } catch (error) {
      console.log(error);
    }
  }
  const addTreatments = async (data) => {
    const payload = {
      patientId:id,
      patientTreatments:data
    };
    try {
      const response = await addPatientTreatments(payload,token);
      loadAllTreatments();
    } catch (error) {
      console.log(error);
    }
  }
  const updateTreatments = async (uid,id,data) => {
    const payload = {
      patientId:uid,
      patientTreatments:data
    };
    try {
      const response = await updatePatientTreatments(id,payload,token);
    } catch (error) {
      console.log(error);
    }
  }

  const handleExpireTreatment = (uid,id) => {
    confirmAlert({
      title: 'Confirm to expire note!!',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            treatments.forEach((treatment)=>{
              if(treatment.vid==id){
                treatment.status = false;
              }
            })
            updateTreatments(uid,treatmentId,JSON.stringify(treatments));
            setTreatments([...treatments]);
          }
        },
        {
          label: 'No',
          onClick: () => {
            console.log('cancelled')
          }
        }
      ]
    });
  }

  useEffect(()=>{
    loadAllTreatments();
  },[])

  return (
    <div className="relative">

      <div className="overflow-y-auto my-0 p-6 h-[480px] sm:h-[600px]">
        <div className="h-full">
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 pb-20">
            {
              (treatments.length>0) ?
                treatments.map((treatment)=>{
                  return (
                    (treatment.type=='form') ? <ThreadBox key={treatment.vid} Id={id} Status={treatment.status} TreatmentId={treatment.vid} Name={treatment.user} Time={treatment.time} Date={treatment.date} Treatment={treatment} handleExpireTreatment={handleExpireTreatment}/> : 
                    (treatment.type=='file') ? <ThreadBox key={treatment.vid} Id={id} Status={treatment.status} TreatmentId={treatment.vid} Name={treatment.user} Time={treatment.time} Date={treatment.date} Img={treatment} handleExpireTreatment={handleExpireTreatment}/> :
                    <ThreadBox key={treatment.vid} Id={id} Status={treatment.status} TreatmentId={treatment.vid} Name={treatment.user} Time={treatment.time} Date={treatment.date} Text={treatment} handleExpireTreatment={handleExpireTreatment}/>
                  )
                })
               :
              <h1 className="font-bold text-2xl absolute text-gray-600">No Data Available</h1>
            }
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-gray-600 mb-0 p-2 rounded-b-lg flex gap-2 items-center">
        <div className="text-white text-xl ms-2 relative">
          <input type="file" accept="image/*" capture="environment" hidden ref={fileRef} onInput={handleFileSelect}/>
          <i class="fa-solid fa-paperclip cursor-pointer" onClick={()=>{fileRef.current.click()}}></i>
          {
            (fileModal) ? 
            <div className="absolute bg-gray-600 border-2 border-gray-600 bottom-0 -translate-y-[42px] -translate-x-[16px]" ref={fileBoxRef}>
              <img src={imageSrc} className="w-full mx-auto" alt=""/>
              <div className="w-full h-14 flex bg-gray-600 items-center border-t-2 border-gray-600 ">
                <input type="text" value={caption} onChange={(e)=>{setCaption(e.target.value)}} className="h-full flex-grow p-4 text-black border-0 outline-none " placeholder="Enter caption here .."/>
                <i class="fa-solid fa-paper-plane text-2xl text-white mx-4 cursor-pointer" onClick={handleSaveFile}></i>
              </div>
            </div> : ''
          }
        </div>
        <div className="mx-2 flex-grow bg-white rounded-lg"><input type="text" value={text} className="w-full border-0 outline-none rounded-lg" placeholder="Enter text here .." onChange={(e)=>{setText(e.target.value)}}/></div>
        <div className="bg-white rounded-lg h-full"><button type="button" className="w-full border-0 outline-none rounded-lg py-2 px-4 font-semibold" onClick={handleSaveText}>Save</button></div>
      </div>

    </div>
  );
}
