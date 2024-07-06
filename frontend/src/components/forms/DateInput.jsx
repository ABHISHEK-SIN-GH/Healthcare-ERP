import React, { useEffect, useRef, useState } from "react";

export default function DateInput({label,value,placeholder,action}) {
    const ref = useRef(null);
    if(value){
      const date = new Date(value);
      ref.current.value = date.toISOString().slice(0,10);
    }
    return (
      <div className="col-span-6 sm:col-span-3">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          required
          type="date"
          ref={ref}
          placeholder={placeholder}
          onChange={(e)=>{action(e.target.value)}}
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>
    );
  }
