import axios from "axios";
import { API_ROUTES } from "../routes";

export const registerOPDPatient = async (patientData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.post(API_ROUTES.OPD_PATIENT, patientData, {headers});
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

export const getAllOPDPatient = async (token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(API_ROUTES.OPD_PATIENT, {headers});
    return response.data.reverse();
  } catch (error) {
    throw new Error("Failed to get all patients");
  }
};

export const getOPDPatient = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(`${API_ROUTES.OPD_PATIENT}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient");
  }
};

export const updateOPDPatient = async (id,patientData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.put(`${API_ROUTES.OPD_PATIENT}/${id}`, patientData, {headers});
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update patient");
  }
};

export const deleteOPDPatient = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.delete(`${API_ROUTES.OPD_PATIENT}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete patient");
  }
};