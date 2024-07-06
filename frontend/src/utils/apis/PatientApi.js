import axios from "axios";
import { API_ROUTES } from "../routes";

export const getAllPatient = async (token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(API_ROUTES.ALL_PATIENT, {headers});
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
    throw new Error("Failed to get opd patient");
  }
};

export const getIPDPatient = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(`${API_ROUTES.IPD_PATIENT}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to get ipd patient");
  }
};
