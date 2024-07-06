import React from "react";

export default function TextInput({ label, value, placeholder, action }) {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        required
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e)=>{action(e.target.value)}}
        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
      />
    </div>
  );
}
