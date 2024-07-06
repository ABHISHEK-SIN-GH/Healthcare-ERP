import axios from "axios";
import { API_ROUTES } from "../routes";

export const registerFrontdesk = async (frontdeskData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.post(API_ROUTES.FRONTDESK, frontdeskData, {headers});
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

export const getAllFrontdesk = async (token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(API_ROUTES.FRONTDESK, {headers});
    return response.data.reverse();
  } catch (error) {
    throw new Error("Failed to get all frontdesks");
  }
};

export const getFrontdesk = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.get(`${API_ROUTES.FRONTDESK}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to get frontdesk");
  }
};

export const updateFrontdesk = async (id,frontdeskData,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.put(`${API_ROUTES.FRONTDESK}/${id}`, frontdeskData, {headers});
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update frontdesk");
  }
};

export const deleteFrontdesk = async (id,token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    const response = await axios.delete(`${API_ROUTES.FRONTDESK}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete frontdesk");
  }
};