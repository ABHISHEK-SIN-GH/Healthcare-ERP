import React from "react";

export default function TextareaInput({label,value,placeholder,action}) {
    return (
      <div className="col-span-6">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <textarea
          required
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e)=>{action(e.target.value)}}
          className="w-full my-0 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm resize-none"
        />
      </div>
    );
  }
