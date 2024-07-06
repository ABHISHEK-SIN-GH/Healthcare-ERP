import axios from "axios";
import { API_ROUTES } from "../routes";

export const configHospital = async (formData,token) => {
  try {
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token,
    }
    const response = await axios.post(API_ROUTES.CONFIG, formData, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to configure hospital setting");
  }
};

export const getConfigHospital = async (token) => {
  try {
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token,
    }
    const response = await axios.get(API_ROUTES.CONFIG, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to get configure hospital setting");
  }
};

export const updateConfigHospital = async (id,formData,token) => {
  try {
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token,
    }
    const response = await axios.put(`${API_ROUTES.CONFIG}/${id}`, formData, {headers});
    return response.data;
  } catch (error) {
    throw new Error("Failed to update configure hospital setting");
  }
};


