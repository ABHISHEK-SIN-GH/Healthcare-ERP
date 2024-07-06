import axios from "axios";
import { API_ROUTES } from "../routes";

export const registerAdmin = async (adminData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.post(API_ROUTES.ADMIN, adminData, {headers});
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

export const getAllAdmin = async (token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(API_ROUTES.ADMIN, {headers});
    return response.data.reverse();
  } catch (error) {
    throw new Error("Failed to get all admins");
  }
};

export const getAdmin = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(`${API_ROUTES.ADMIN}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to get admin");
  }
};

export const updateAdmin = async (id,adminData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.put(`${API_ROUTES.ADMIN}/${id}`, adminData, {headers});
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update admin");
  }
};

export const deleteAdmin = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.delete(`${API_ROUTES.ADMIN}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete admin");
  }
};