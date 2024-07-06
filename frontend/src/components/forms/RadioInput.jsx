import React from "react";

export default function RadioInput({label,items}) {
  const departments = [
    { name: "Emergency Medicine", value: "Emergency Medicine" },
    { name: "Cardiology", value: "Cardiology" },
    { name: "Neurology", value: "Neurology" },
    { name: "Oncology", value: "Oncology" },
    { name: "Orthopedics", value: "Orthopedics" },
    { name: "Pediatrics", value: "Pediatrics" },
    { name: "Psychiatry", value: "Psychiatry" },
    { name: "Radiology", value: "Radiology" },
    { name: "Surgery", value: "Surgery" },
    { name: "Internal Medicine", value: "Internal Medicine" },
  ];

  const doctors = [
    { name: "Dr. John Doe", value: "Dr. John Doe" },
    { name: "Dr. Emily Johnson", value: "Dr. Emily Johnson" },
    { name: "Dr. Michael Brown", value: "Dr. Michael Brown" },
    { name: "Dr. Sarah Martinez", value: "Dr. Sarah Martinez" },
    { name: "Dr. Emma White", value: "Dr. Emma White" },
  ];

  const bloodGroups = [
    { name: "A+", value: "A+" },
    { name: "A-", value: "A-" },
    { name: "B+", value: "B+" },
    { name: "B-", value: "B-" },
    { name: "AB+", value: "AB+" },
    { name: "AB-", value: "AB-" },
    { name: "O+", value: "O+" },
    { name: "O-", value: "O-" }
  ];
  return (
    <div className="col-span-6 sm:col-span-1 md:col-span-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center h-10">
        {
          items.map((item,idx)=>{
            return <>
              {
                (idx==0) ?  
                <input
                  defaultChecked
                  type="radio"
                  name={item.name}
                  value={item.value}
                  className="mt-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm me-2"
                /> : 
                  <input
                  type="radio"
                  name={item.name}
                  value={item.value}
                  className="mt-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm me-2"
                />
              }
              <label className="text-sm font-medium text-gray-700 me-2">{item.value}</label>
            </>
          })
        }
      </div>
    </div>
  );
}
