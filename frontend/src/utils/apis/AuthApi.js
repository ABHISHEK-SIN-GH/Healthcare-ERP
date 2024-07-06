import axios from "axios";
import { API_ROUTES } from "../routes";

export const auth = async (authData) => {
  try {
    const headers = {
        "Content-Type": "application/json"
    };
    const response = await axios.post(API_ROUTES.AUTH, authData, {headers});
    return response.data;
  } catch (error) {
    console.log("Error logging user:", error.response.data);
    throw new Error("Failed to login user");
  }
};
