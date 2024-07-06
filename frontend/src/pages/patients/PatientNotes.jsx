import React, { useState , useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { getPatientNotes, addPatientNotes, updatePatientNotes } from "../../utils/apis/PatientDetailsApi";
import { useParams } from "react-router-dom";
import { uploadFile } from "../../utils/apis/UploadApi";
import { API_ROUTES } from "../../utils/routes";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';

const note1 = ["2024-04-01", "08:00", "120/80 mmHg", "70 bpm", "98%", "36.5°C", "90 mg/dL"]

const ThreadBox = ({Id,NoteId,Status,Name,Time,Date,Text,Img,Note,handleExpireNote}) => {
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
              (Note) ? 
              <div class="text-sm font-normal text-gray-900 dark:text-white">
                <small><b>Parameter | Value</b></small> <hr className="my-1"/>
                <small><b>BP:</b> {Note.bp}</small> <hr className="my-1"/>
                <small><b>Pulse:</b> {Note.pulse}</small> <hr className="my-1"/>
                <small><b>SPO2:</b> {Note.spo2}</small> <hr className="my-1"/>
                <small><b>Temp:</b> {Note.temp}</small> <hr className="my-1"/>
                <small><b>Blood/Sugar:</b> {Note.bs}</small>
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

export default function PatientNotes() {

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
  const [notes,setNotes] = useState([]);
  const [notesData,setNotesData] = useState([]);
  const [noteId, setNoteId] = useState('');

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
        setNotes([bodyData,...notes]);
        if(notesData.length==0){
          addNotes(JSON.stringify([bodyData,...notes]));
        }else{
          updateNotes(id,notesData[0]._id,JSON.stringify([bodyData,...notes]));
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
    setNotes([bodyData,...notes]);
    if(notesData.length==0){
      addNotes(JSON.stringify([bodyData,...notes]));
    }else{
      updateNotes(id,notesData[0]._id,JSON.stringify([bodyData,...notes]));
    }
    setText('');
    toast.update(toastId, { render: "Loaded Successfully..", type: "success", isLoading:false});
    toast.dismiss(toastId);
  } 

  const loadAllNotes = async () => {
    try {
      const response = await getPatientNotes(id,token);
      setNotesData(response);
      setNotes(JSON.parse(response[0]?.patientNotes));
      setNoteId(response[0]._id);
    } catch (error) {
      console.log(error);
    }
  }
  const addNotes = async (data) => {
    const payload = {
      patientId:id,
      patientNotes:data
    };
    try {
      const response = await addPatientNotes(payload,token);
      loadAllNotes();
    } catch (error) {
      console.log(error);
    }
  }
  const updateNotes = async (uid,id,data) => {
    const payload = {
      patientId:uid,
      patientNotes:data
    };
    try {
      const response = await updatePatientNotes(id,payload,token);
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
            notes.forEach((note)=>{
              if(note.vid==id){
                note.status = false;
              }
            })
            updateNotes(uid,noteId,JSON.stringify(notes));
            setNotes([...notes]);
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
    loadAllNotes();
  },[])

  return (
    <div className="relative">

      <div className="overflow-y-auto my-0 p-6 h-[480px] sm:h-[600px]">
        <div className="h-full">
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 pb-20">
            {
              (notes.length>0) ?
                notes.map((note)=>{
                  return (
                    (note.type=='form') ? <ThreadBox key={note.vid} Id={id} Status={note.status} NoteId={note.vid} Name={note.user} Time={note.time} Date={note.date} Note={note} handleExpireNote={handleExpireNote}/> : 
                    (note.type=='file') ? <ThreadBox key={note.vid} Id={id} Status={note.status} NoteId={note.vid} Name={note.user} Time={note.time} Date={note.date} Img={note} handleExpireNote={handleExpireNote}/> :
                    <ThreadBox key={note.vid} Id={id} Status={note.status} NoteId={note.vid} Name={note.user} Time={note.time} Date={note.date} Text={note} handleExpireNote={handleExpireNote}/>
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
