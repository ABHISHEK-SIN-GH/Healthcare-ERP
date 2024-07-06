import axios from "axios";
import { API_ROUTES } from "../routes";

export const registerMedicine = async (medicineData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.post(API_ROUTES.MEDICINE, medicineData, {headers});
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400 ) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error('An error occurred while processing your request.');
      }
    } else if (error.request) {
      throw new Error('No response received from server.');
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const getAllMedicine = async (token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(API_ROUTES.MEDICINE, {headers});
    return response.data.reverse();
  } catch (error) {
    throw new Error("Failed to get all medicines");
  }
};

export const getMedicine = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(`${API_ROUTES.MEDICINE}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to get medicine");
  }
};

export const updateMedicine = async (id,medicineData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.put(`${API_ROUTES.MEDICINE}/${id}`, medicineData, {headers});
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update medicine");
  }
};

export const deleteMedicine = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.delete(`${API_ROUTES.MEDICINE}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete medicine");
  }
};