import axios from "axios";
import { API_ROUTES } from "../routes";

export const registerDoctor = async (doctorData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.post(API_ROUTES.DOCTOR, doctorData, {headers});
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

export const getAllDoctor = async (token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(API_ROUTES.DOCTOR, {headers});
    return response.data.reverse();
  } catch (error) {
    throw new Error("Failed to get all doctors");
  }
};

export const getDoctor = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(`${API_ROUTES.DOCTOR}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to get doctor");
  }
};

export const updateDoctor = async (id,doctorData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.put(`${API_ROUTES.DOCTOR}/${id}`, doctorData, {headers});
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update doctor");
  }
};

export const deleteDoctor = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.delete(`${API_ROUTES.DOCTOR}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete doctor");
  }
};