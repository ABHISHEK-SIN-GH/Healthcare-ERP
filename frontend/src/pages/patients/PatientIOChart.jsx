import React, { useState , useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { getPatientIOCharts, addPatientIOCharts, updatePatientIOCharts } from "../../utils/apis/PatientDetailsApi";
import { useParams } from "react-router-dom";
import { uploadFile } from "../../utils/apis/UploadApi";
import { API_ROUTES } from "../../utils/routes";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';

const Intake = [
  "Saline - 1000ml",
  "Antibiotic - 500mg",
  "Paracetamol - 500mg",
  "Nutrition - 300ml"
]

const Output = [
  "700ml",
  "30ml",
  "80g",
  "20ml",
  "40ml",
  "200ml"
]

const ThreadBox = ({Id,NoteId,Status,Name,Time,Date,Text,Img,Intake,Output,handleExpireNote}) => {
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
              (Intake) ? 
              <div class="text-sm font-normal text-gray-900 dark:text-white">
                <small className="mx-auto"><b>INTAKE</b></small> <hr className="my-1"/>
                <small><b>Fluids:</b> {Intake.fluids}</small> <hr className="my-1"/>
                <small><b>Medications:</b> {Intake.medications}</small> <hr className="my-1"/>
                <small><b>Oral:</b> {Intake.oral}</small> <hr className="my-1"/>
                <small><b>RT:</b> {Intake.rt}</small>
              </div> : ''
            }
            {
              (Output) ? 
              <div class="text-sm font-normal text-gray-900 dark:text-white">
                <small className="mx-auto"><b>OUTPUT</b></small> <hr className="my-1"/>
                <small><b>Urine:</b> {Output.urine}</small> <hr className="my-1"/>
                <small><b>Vomit:</b> {Output.vomit}</small> <hr className="my-1"/>
                <small><b>Stool:</b> {Output.stool}</small> <hr className="my-1"/>
                <small><b>RT Asp.:</b> {Output.rtAsp}</small> <hr className="my-1"/>
                <small><b>Drain:</b> {Output.drain}</small> <hr className="my-1"/>
                <small><b>Discharge:</b> {Output.discharge}</small>
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

export default function PatientIOChart() {

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          hideFileModal();
          setAddModal(false);
          setMinusModal(false);
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
  const [ioCharts,setIOCharts] = useState([]);
  const [ioChartsData,setIOChartsData] = useState([]);
  const [ioChartId, setIOChartId] = useState('');

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
        setIOCharts([bodyData,...ioCharts]);
        if(ioChartsData.length==0){
          addIOCharts(JSON.stringify([bodyData,...ioCharts]));
        }else{
          updateIOCharts(id,ioChartsData[0]._id,JSON.stringify([bodyData,...ioCharts]));
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
  const [minusModal,setMinusModal] = useState(false);

  const addBoxRef = useRef(null);
  useOutsideAlerter(addBoxRef)
  const [fluids,setFluids] = useState('');
  const [medications,setMedications] = useState('');
  const [oral,setOral] = useState('');
  const [rt,setRt] = useState('');
  const handleSaveInForm = async () => {
    if(!fluids || !medications || !oral || !rt){
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
      type:'in-form',
      fluids,
      medications,
      oral,
      rt,
    }
    setIOCharts([bodyData,...ioCharts]);
    if(ioChartsData.length==0){
      addIOCharts(JSON.stringify([bodyData,...ioCharts]));
    }else{
      updateIOCharts(id,ioChartsData[0]._id,JSON.stringify([bodyData,...ioCharts]));
    }
    setFluids('')
    setMedications('')
    setOral('')
    setRt('')
    setAddModal(false);
    toast.update(toastId, { render: "Loaded Successfully..", type: "success", isLoading:false});
    toast.dismiss(toastId);
  }

  const minusBoxRef = useRef(null);
  useOutsideAlerter(minusBoxRef)
  const [urine,setUrine] = useState('');
  const [vomit,setVomit] = useState('');
  const [stool,setStool] = useState('');
  const [rtAsp,setRtAsp] = useState('');
  const [drain,setDrain] = useState('');
  const [discharge,setDischarge] = useState('');
  const handleSaveOutForm = async () => {
    if(!urine || !vomit || !stool || !rtAsp || !drain || !discharge){
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
      type:'out-form',
      urine,
      vomit,
      stool,
      rtAsp,
      drain,
      discharge,
    }
    setIOCharts([bodyData,...ioCharts]);
    if(ioChartsData.length==0){
      addIOCharts(JSON.stringify([bodyData,...ioCharts]));
    }else{
      updateIOCharts(id,ioChartsData[0]._id,JSON.stringify([bodyData,...ioCharts]));
    }
    setUrine('')
    setVomit('')
    setStool('')
    setRtAsp('')
    setDrain('')
    setDischarge('')
    setMinusModal(false);
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
    setIOCharts([bodyData,...ioCharts]);
    if(ioChartsData.length==0){
      addIOCharts(JSON.stringify([bodyData,...ioCharts]));
    }else{
      updateIOCharts(id,ioChartsData[0]._id,JSON.stringify([bodyData,...ioCharts]));
    }
    setText('');
    toast.update(toastId, { render: "Loaded Successfully..", type: "success", isLoading:false});
    toast.dismiss(toastId);
  } 

  const loadAllIOCharts = async () => {
    try {
      const response = await getPatientIOCharts(id,token);
      setIOChartsData(response);
      setIOCharts(JSON.parse(response[0]?.patientIOCharts));
      setIOChartId(response[0]._id);
    } catch (error) {
      console.log(error);
    }
  }
  const addIOCharts = async (data) => {
    const payload = {
      patientId:id,
      patientIOCharts:data
    };
    try {
      const response = await addPatientIOCharts(payload,token);
      loadAllIOCharts();
    } catch (error) {
      console.log(error);
    }
  }
  const updateIOCharts = async (uid,id,data) => {
    const payload = {
      patientId:uid,
      patientIOCharts:data
    };
    try {
      const response = await updatePatientIOCharts(id,payload,token);
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
            ioCharts.forEach((ioChart)=>{
              if(ioChart.vid==id){
                ioChart.status = false;
              }
            })
            updateIOCharts(uid,ioChartId,JSON.stringify(ioCharts));
            setIOCharts([...ioCharts]);
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
    loadAllIOCharts();
  },[])

  return (
    <div className="relative">

      <div className="overflow-y-auto my-0 p-6 h-[480px] sm:h-[600px]">
        <div className="h-full">
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 pb-20">
            {
              (ioCharts.length>0) ?
                ioCharts.map((ioChart)=>{
                  return (
                    (ioChart.type=='in-form') ? <ThreadBox key={ioChart.vid} Id={id} Status={ioChart.status} NoteId={ioChart.vid} Name={ioChart.user} Time={ioChart.time} Date={ioChart.date} Intake={ioChart} handleExpireNote={handleExpireNote}/> : 
                    (ioChart.type=='out-form') ? <ThreadBox key={ioChart.vid} Id={id} Status={ioChart.status} NoteId={ioChart.vid} Name={ioChart.user} Time={ioChart.time} Date={ioChart.date} Output={ioChart} handleExpireNote={handleExpireNote}/> : 
                    (ioChart.type=='file') ? <ThreadBox key={ioChart.vid} Id={id} Status={ioChart.status} NoteId={ioChart.vid} Name={ioChart.user} Time={ioChart.time} Date={ioChart.date} Img={ioChart} handleExpireNote={handleExpireNote}/> :
                    <ThreadBox key={ioChart.vid} Id={id} Status={ioChart.status} NoteId={ioChart.vid} Name={ioChart.user} Time={ioChart.time} Date={ioChart.date} Text={ioChart} handleExpireNote={handleExpireNote}/>
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
              <input type="text" className="w-full" placeholder="I/V Fluids.." value={fluids} onChange={(e)=>{setFluids(e.target.value)}}/>
            </li>
            <li>
              <input type="text" className="w-full" placeholder="I/V Medication.." value={medications} onChange={(e)=>{setMedications(e.target.value)}}/>
            </li>
            <li>
              <input type="text" className="w-full" placeholder="Oral.." value={oral} onChange={(e)=>{setOral(e.target.value)}}/>
            </li>
            <li>
              <input type="text" className="w-full" placeholder="RT.." value={rt} onChange={(e)=>{setRt(e.target.value)}}/>
            </li>
            <li>
              <button className="w-full p-2 border mt-2 text-white font-bold" onClick={handleSaveInForm}>Save Intake</button>
            </li>
          </ul>
        </div> : ''
      }

      {
        (minusModal) ? 
        <div class="z-10 text-black divide-y divide-gray-100 rounded-lg shadow w-52 absolute bottom-0 mb-16" ref={minusBoxRef}>
          <ul class="p-2 text-sm bg-gray-600">
            <li>
              <input type="text" className="w-full" placeholder="Urine.." value={urine} onChange={(e)=>{setUrine(e.target.value)}}/>
            </li>
            <li>
              <input type="text" className="w-full" placeholder="Vomit.." value={vomit} onChange={(e)=>{setVomit(e.target.value)}}/>
            </li>
            <li>
              <input type="text" className="w-full" placeholder="Stool.." value={stool} onChange={(e)=>{setStool(e.target.value)}}/>
            </li>
            <li>
              <input type="text" className="w-full" placeholder="RT Asp.." value={rtAsp} onChange={(e)=>{setRtAsp(e.target.value)}}/>
            </li>
            <li>
              <input type="text" className="w-full" placeholder="Drain.." value={drain} onChange={(e)=>{setDrain(e.target.value)}}/>
            </li>
            <li>
              <input type="text" className="w-full" placeholder="Discharge.." value={discharge} onChange={(e)=>{setDischarge(e.target.value)}}/>
            </li>
            <li>
              <button className="w-full p-2 border mt-2 text-white font-bold" onClick={handleSaveOutForm}>Save Output</button>
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
        <div className="text-white text-xl me-2">
          <i class="fa-solid fa-circle-minus cursor-pointer" onClick={()=>{setMinusModal(!addModal)}}></i>
        </div>
        <div className="flex-grow bg-white rounded-lg"><input type="text" value={text} className="w-full border-0 outline-none rounded-lg" placeholder="Enter text here .." onChange={(e)=>{setText(e.target.value)}}/></div>
        <div className="bg-white rounded-lg h-full"><button type="button" className="w-full border-0 outline-none rounded-lg py-2 px-4 font-semibold" onClick={handleSaveText}>Save</button></div>
      </div>

    </div>
  );
}
