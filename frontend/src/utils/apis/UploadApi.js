import axios from "axios";
import { API_ROUTES } from "../routes";

export const uploadFile = async (formData, token) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    };
    const response = await axios.post(API_ROUTES.UPLOAD, formData, { headers });
    return response.data;
  } catch (error) {
    throw new Error("Failed to upload file..");
  }
};
