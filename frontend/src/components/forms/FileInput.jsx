import React, { useRef, useState } from "react";
import preview from "../../assets/preview.png";
import { API_ROUTES } from "../../utils/routes";
export default function FileInput({label,value,placeholder,remove,action}) {
    const ref = useRef(null); 
    const [srcURL,setSrcURL] = useState(preview);
    if(value){
      ref.current.src = `${API_ROUTES.STATIC}/${value}`;
    }
    return (
      <div className="col-span-6 sm:col-span-1 ">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <img ref={ref} src={srcURL} className="w-28 h-28 mt-1 rounded-md border-gray-200 border-2 bg-white text-sm text-gray-700 shadow-sm"/>
        <input
          type="file"
          placeholder={placeholder}
          onChange={(e)=>{
            action(e.target.files[0]);
            setSrcURL(URL.createObjectURL(e.target.files[0]));
            remove(null);
          }}
          className="mt-1 w-full rounded-md border-gray-200 border-2 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>
    );
  }
