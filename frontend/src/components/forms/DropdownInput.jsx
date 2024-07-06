import React from "react";

export default function DropdownInput({label,value,items,action}) {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select 
      required
      onChange={(e)=>{action(e.target.value)}}
      className="mt-1 w-full h-10 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm me-2 px-2">
        {
          items.map((item)=>{
            {
              return (value==item.value) ?
              <option value={item.value} selected>{item.name}</option> : 
              <option value={item.value}>{item.name}</option> 
            }
          })
        }
      </select>
    </div>
  );
}