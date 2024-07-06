import axios from "axios";
import { API_ROUTES } from "../routes";

export const registerPharmacist = async (pharmacistData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.post(API_ROUTES.PHARMACIST, pharmacistData, {headers});
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

export const getAllPharmacist = async (token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(API_ROUTES.PHARMACIST, {headers});
    return response.data.reverse();
  } catch (error) {
    throw new Error("Failed to get all pharmacists");
  }
};

export const getPharmacist = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(`${API_ROUTES.PHARMACIST}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to get pharmacist");
  }
};

export const updatePharmacist = async (id,pharmacistData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.put(`${API_ROUTES.PHARMACIST}/${id}`, pharmacistData, {headers});
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update pharmacist");
  }
};

export const deletePharmacist = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.delete(`${API_ROUTES.PHARMACIST}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete pharmacist");
  }
};