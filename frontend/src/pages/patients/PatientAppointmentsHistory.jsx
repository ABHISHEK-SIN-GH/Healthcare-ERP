import React, { useState , useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { getPatientVisits, addPatientVisits, updatePatientVisits } from "../../utils/apis/PatientDetailsApi";
import { useParams } from "react-router-dom";
import { uploadFile } from "../../utils/apis/UploadApi";
import { API_ROUTES } from "../../utils/routes";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import { getAllDoctor } from "../../utils/apis/DoctorApi";

const visits = [
  [
    "Dr. Johnson",
    "Routine check-up",
    "Patient is recovering well. No new symptoms observed.",
    "Recovering from flu",
    "Doctor's sample instructions..."
  ],
  [
    "Dr. Patel",
    "Follow-up appointment",
    "Patient reports decreased pain and improved mobility.",
    "Recovering from knee surgery",
    "Doctor's sample instructions..."
  ],
  [
    "Dr. Lee",
    "Annual physical",
    "Blood pressure and cholesterol levels within normal range.",
    "No specific diagnosis",
    "Doctor's sample instructions..."
  ],
  [
    "Dr. Garcia",
    "Medication review",
    "Patient reports experiencing side effects. Medication dosage adjusted.",
    "Chronic hypertension",
    "Doctor's sample instructions..."
  ],
  [
    "Dr. Nguyen",
    "Consultation for chronic pain management",
    "Discussion about alternative therapies and pain management techniques.",
    "Chronic back pain",
    "Doctor's sample instructions..."
  ],
  [
    "Dr. Rodriguez",
    "Follow-up appointment",
    "Patient's condition remains stable. No new concerns reported.",
    "Recovering from appendectomy",
    "Doctor's sample instructions..."
  ],
  [
    "Dr. Kim",
    "Review of lab results",
    "Lab results indicate improvement in liver function.",
    "Liver cirrhosis",
    "Doctor's sample instructions..."
  ],
  [
    "Dr. Smith",
    "Flu vaccination",
    "Patient received flu vaccination without any adverse reactions.",
    "Preventive care",
    "Doctor's sample instructions..."
  ],
  [
    "Dr. Wu",
    "Consultation for allergy testing",
    "Discussion about allergy symptoms and scheduling allergy testing.",
    "Suspected allergies",
    "Doctor's sample instructions..."
  ],
  [
    "Dr. Taylor",
    "Follow-up appointment",
    "Patient reports feeling better. No further concerns.",
    "Recovering from pneumonia",
    "Doctor's sample instructions..."
  ]
]

const ThreadBox = ({Id,NoteId,Status,Name,Time,Date,Text,Img,Visit,handleExpireNote}) => {
  return (
    <div class={(Status)?"flex items-start gap-4 mb-4 cursor-pointer":"flex items-start gap-4 mb-4 opacity-80"} onClick={()=>{(Status)?handleExpireNote(Id,NoteId):''}}>
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
              (Visit) ? 
              <div class="text-sm font-normal text-gray-900 dark:text-white">
                <small><b>Doctor : </b> {Visit.doctor}</small> <hr className="my-1"/>
                <small><b>Purpose : </b> {Visit.purpose}</small> <hr className="my-1"/>
                <small><b>Findings :</b> {Visit.findings}</small> <hr className="my-1"/>
                <small><b>Diagnosis : </b> {Visit.diagnosis}</small> <hr className="my-1"/> 
                <small><b>Instructions : </b> {Visit.instructions}</small>
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

export default function PatientAppointmentsHistory() {

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          hideFileModal();
          setAddModal(false);
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
  const [visits,setVisits] = useState([]);
  const [visitsData,setVisitsData] = useState([]);
  const [visitId, setVisitId] = useState('');

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
        setVisits([bodyData,...visits]);
        if(visitsData.length==0){
          addVisits(JSON.stringify([bodyData,...visits]));
        }else{
          updateVisits(id,visitsData[0]._id,JSON.stringify([bodyData,...visits]));
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

  const [addModal,setAddModal] = useState(false);
  const addBoxRef = useRef(null);
  useOutsideAlerter(addBoxRef)
  const [allDoctors,setAllDoctors] = useState([]);
  const [doctor,setDoctor] = useState('');
  const [purpose,setPurpose] = useState('');
  const [findings,setFindings] = useState('');
  const [diagnosis,setDiagnosis] = useState('');
  const [instructions,setInstructions] = useState('');
  const handleSaveForm = async () => {
    if(!allDoctors || !doctor || !purpose || !findings || !diagnosis || !instructions){
      toastId = toast.loading("Form is empty..");
      setTimeout(()=>{
        toast.dismiss(toastId);
      },1000)  
      return;
    }
    toastId = toast.loading("Please wait...");
    const date = new Date();
    const vid = uuidv4();
    const bodyData = {
      vid,
      user,
      date:date.toLocaleDateString(),
      time:date.toLocaleTimeString(),
      status:true,
      type:'form',
      doctor,
      purpose,
      findings,
      diagnosis,
      instructions,
    }
    setVisits([bodyData,...visits]);
    if(visitsData.length==0){
      addVisits(JSON.stringify([bodyData,...visits]));
    }else{
      updateVisits(id,visitsData[0]._id,JSON.stringify([bodyData,...visits]));
    }
    setDoctor('');
    setPurpose('');
    setFindings('');
    setDiagnosis('');
    setInstructions('');
    setAddModal(false);
    toast.update(toastId, { render: "Loaded Successfully..", type: "success", isLoading:false});
    toast.dismiss(toastId);
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
    setVisits([bodyData,...visits]);
    if(visitsData.length==0){
      addVisits(JSON.stringify([bodyData,...visits]));
    }else{
      updateVisits(id,visitsData[0]._id,JSON.stringify([bodyData,...visits]));
    }
    setText('');
    toast.update(toastId, { render: "Loaded Successfully..", type: "success", isLoading:false});
    toast.dismiss(toastId);
  } 

  const loadAllVisits = async () => {
    try {
      const response = await getPatientVisits(id,token);
      setVisitsData(response);
      setVisits(JSON.parse(response[0]?.patientVisits));
      setVisitId(response[0]._id);
    } catch (error) {
      console.log(error);
    }
  }
  const addVisits = async (data) => {
    const payload = {
      patientId:id,
      patientVisits:data
    };
    try {
      const response = await addPatientVisits(payload,token);
      loadAllVisits();
    } catch (error) {
      console.log(error);
    }
  }
  const updateVisits = async (uid,id,data) => {
    const payload = {
      patientId:uid,
      patientVisits:data
    };
    try {
      const response = await updatePatientVisits(id,payload,token);
    } catch (error) {
      console.log(error);
    }
  }

  const handleExpireNote = (uid,id) => {
    confirmAlert({
      title: 'Confirm to expire note!!',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            visits.forEach((visit)=>{
              if(visit.vid==id){
                visit.status = false;
              }
            })
            updateVisits(uid,visitId,JSON.stringify(visits));
            setVisits([...visits]);
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
    loadAllVisits();
  },[])

  const loadAllDoctors = async (token) => {
    let allDocs = await getAllDoctor(token);  
    let allDocsName = [];
    allDocs.forEach((doc)=>{
      allDocsName.push({name:`Dr. ${doc.fname}`,value:doc._id});
    })
    allDocsName.push({name:'Others',value:'others'});
    setAllDoctors(allDocsName);
    setDoctor(allDocsName[0]?.name);
  }

  useEffect(()=>{
    loadAllDoctors(token);
  },[])

  return (
    <div className="relative">

      <div className="overflow-y-auto my-0 p-6 h-[480px] sm:h-[600px]">
        <div className="h-full">
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 pb-20">
            {
              (visits.length>0) ?
                visits.map((visit)=>{
                  return (
                    (visit.type=='form') ? <ThreadBox key={visit.vid} Id={id} Status={visit.status} NoteId={visit.vid} Name={visit.user} Time={visit.time} Date={visit.date} Visit={visit} handleExpireNote={handleExpireNote}/> : 
                    (visit.type=='file') ? <ThreadBox key={visit.vid} Id={id} Status={visit.status} NoteId={visit.vid} Name={visit.user} Time={visit.time} Date={visit.date} Img={visit} handleExpireNote={handleExpireNote}/> :
                    <ThreadBox key={visit.vid} Id={id} Status={visit.status} NoteId={visit.vid} Name={visit.user} Time={visit.time} Date={visit.date} Text={visit} handleExpireNote={handleExpireNote}/>
                  )
                })
               :
              <h1 className="font-bold text-2xl absolute text-gray-600">No Data Available</h1>
            }
          </div>
        </div>
      </div>

      {
        (addModal) ? 
        <div class="z-10 text-black divide-y divide-gray-100 rounded-lg shadow w-52 absolute bottom-0 mb-16" ref={addBoxRef}>
          <ul class="p-2 text-sm bg-gray-600">
            <li>
              <select className="w-full" placeholder="Doctor.." onChange={(e)=>{setDoctor(e.target.value)}}>
                {
                  allDoctors.map((item)=>{
                    {
                      return (doctor.value==item.value) ?
                      <option value={item.name} selected>{item.name}</option> : 
                      <option value={item.name}>{item.name}</option> 
                    }
                  })
                }
              </select>
            </li>
            <li>
              <input type="text" className="w-full" placeholder="Purpose.." value={purpose} onChange={(e)=>{setPurpose(e.target.value)}}/>
            </li>
            <li>
              <input type="text" className="w-full" placeholder="Findings.." value={findings} onChange={(e)=>{setFindings(e.target.value)}}/>
            </li>
            <li>
              <input type="text" className="w-full" placeholder="Diagnosis.." value={diagnosis} onChange={(e)=>{setDiagnosis(e.target.value)}}/>
            </li>
            <li>
              <input type="text" className="w-full" placeholder="Instructions.." value={instructions} onChange={(e)=>{setInstructions(e.target.value)}}/>
            </li>
            <li>
              <button className="w-full p-2 border mt-2 text-white font-bold" onClick={handleSaveForm}>Save</button>
            </li>
          </ul>
        </div> : ''
      }

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
        <div className="text-white text-xl mx-2">
          <i class="fa-solid fa-circle-plus cursor-pointer" onClick={()=>{setAddModal(!addModal)}}></i>
        </div>
        <div className="flex-grow bg-white rounded-lg"><input type="text" value={text} className="w-full border-0 outline-none rounded-lg" placeholder="Enter text here .." onChange={(e)=>{setText(e.target.value)}}/></div>
        <div className="bg-white rounded-lg h-full"><button type="button" className="w-full border-0 outline-none rounded-lg py-2 px-4 font-semibold" onClick={handleSaveText}>Save</button></div>
      </div>

    </div>
  );
}