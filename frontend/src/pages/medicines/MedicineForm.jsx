import React, { useEffect, useState } from "react";
import TextInput from "../../components/forms/TextInput";
import NumberInput from "../../components/forms/NumberInput";
import TextareaInput from "../../components/forms/TextareaInput";
import Button from "../../components/forms/Button";
import DropdownInput from "../../components/forms/DropdownInput";
import { getMedicine, registerMedicine, updateMedicine } from "../../utils/apis/MedicineApi";
import { useParams } from "react-router-dom";
import { Notify } from "../../utils/notifier";
import { handleValidation } from "../../utils/helpers/Validation";

export default function MedicineForm() {
  const {id} = useParams();
  
  const [name,setName] = useState('');
  const [category,setCategory] = useState('');
  const [brand,setBrand] = useState('');
  const [buyPrice,setBuyPrice] = useState('');
  const [sellPrice,setSellPrice] = useState('');
  const [sideEffect,setSideEffect] = useState('');
  const [description,setDescription] = useState('');
  const [token,setToken] = useState(localStorage.getItem('jwt'));

  const handleRegisterMedicine = async () => {
    const data = {
      name,
      category,
      brand,
      buyPrice,
      sellPrice,
      sideEffect,
      description
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await registerMedicine(data,token);
      console.log(response);
      Notify('success','registered medicine successfully');
    } catch (error) {
      console.log(error);    
      Notify('error',error.message.toString());
    }
  } 

  const handleUpdateMedicine = async () => {
    const data = {
      name,
      category,
      brand,
      buyPrice,
      sellPrice,
      sideEffect,
      description
    }
    if(!handleValidation(data)){
      return
    }
    try {
      const response = await updateMedicine(id,data,token);
      console.log(response);
      Notify('success','updated medicine data');
    } catch (error) {
      console.log(error);
      Notify('error','error to update medicine data');    
    }
  } 

  const loadMedicine = async (id,token) => {
    try {
      const medicine = await getMedicine(id,token);
      setName(medicine.name)
      setCategory(medicine.category)
      setBrand(medicine.brand)
      setBuyPrice(medicine.buyPrice)
      setSellPrice(medicine.sellPrice)
      setSideEffect(medicine.sideEffect)
      setDescription(medicine.description)
      Notify('success','loaded medicine data');
    } catch (error) {
      console.log(error);
      Notify('error','error to load medicine data');
    }
  };

  useEffect(()=>{
    if(id){
      loadMedicine(id,token);
    }
  },[])

  return (
    <>
      <h1 className='text-2xl font-bold text-start mb-6'>{(id)?"Update Medicine":"New Medicine Registration"}</h1>
      <form className="mt-8 grid grid-cols-6 gap-6">
        <TextInput value={name} action={setName} label={"Medicine Name"} placeholder={"Enter medicine name.."}/>
        <TextInput value={category} action={setCategory} label={"Medicine Category"} placeholder={"Enter medicine category.."}/>
        <TextInput value={brand} action={setBrand} label={"Medicine Brand"} placeholder={"Enter medicine brand.."}/>
        <NumberInput value={buyPrice} action={setBuyPrice} label={"Buying Price"} placeholder={"Enter buying price.."}/>
        <NumberInput value={sellPrice} action={setSellPrice} label={"Selling Price"} placeholder={"Enter selling price.."}/>
        <TextInput value={sideEffect} action={setSideEffect} label={"Side Effects"} placeholder={"Enter side effects.."}/>
        <TextareaInput value={description} action={setDescription} label={"Description"} placeholder={"Enter description.."}/>
        {
          (id) ? 
          <Button action={handleUpdateMedicine} label={"update"} color={"white"} bgColor={"black"}/> :
          <Button action={handleRegisterMedicine} label={"submit"} color={"white"} bgColor={"black"}/>
        }
        <Button label={"cancel"} color={"white"} bgColor={"gray-400"}/>
      </form>
    </>
  );
}
