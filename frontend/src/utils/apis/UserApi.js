import axios from "axios";
import { API_ROUTES } from "../routes";

export const registerUser = async (userData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.post(API_ROUTES.USER, userData, {headers});
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

export const getAllUser = async (token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(API_ROUTES.USER, {headers});
    return response.data.reverse();
  } catch (error) {
    throw new Error("Failed to get all users");
  }
};

export const getUser = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(`${API_ROUTES.USER}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to get user");
  }
};

export const updateUser = async (id,userData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.put(`${API_ROUTES.USER}/${id}`, userData, {headers});
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.delete(`${API_ROUTES.USER}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};