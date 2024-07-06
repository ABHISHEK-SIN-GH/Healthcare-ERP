import React from "react";

export default function DropdownInputID({label,value,items,action}) {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select 
      required
      onChange={(e)=>{
        action(JSON.parse(e.target.value))
      }}
      className="mt-1 w-full h-10 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm me-2 px-2">
        {
          items.map((item)=>{
            const doc = JSON.stringify({name:item.name,value:item.value});
            {
              return (value.value==item.value) ?
              <option value={doc} selected>{item.name}</option> : 
              <option value={doc}>{item.name}</option> 
            }
          })
        }
      </select>
    </div>
  );
}