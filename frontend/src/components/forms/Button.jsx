import React from "react";

export default function Button({label,color,bgColor,submit,action}) {
    return (
      <div className="col-span-6 sm:col-span-1">
        <button type="button" onClick={action} className={`mt-1 w-full h-10 rounded-md border-gray-200 bg-${bgColor} text-sm text-${color} shadow-sm`}>{label}</button>
      </div>
    );
  }