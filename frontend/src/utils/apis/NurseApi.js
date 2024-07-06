import axios from "axios";
import { API_ROUTES } from "../routes";

export const registerNurse = async (nurseData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.post(API_ROUTES.NURSE, nurseData, {headers});
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

export const getAllNurse = async (token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(API_ROUTES.NURSE, {headers});
    return response.data.reverse();
  } catch (error) {
    throw new Error("Failed to get all nurses");
  }
};

export const getNurse = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(`${API_ROUTES.NURSE}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to get nurse");
  }
};

export const updateNurse = async (id,nurseData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.put(`${API_ROUTES.NURSE}/${id}`, nurseData, {headers});
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update nurse");
  }
};

export const deleteNurse = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.delete(`${API_ROUTES.NURSE}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete nurse");
  }
};