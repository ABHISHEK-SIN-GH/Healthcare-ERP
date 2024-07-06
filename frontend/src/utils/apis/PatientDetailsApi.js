import axios from "axios";
import { API_ROUTES } from "../routes";

export const getPatientProcedures = async (uid,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.get(`${API_ROUTES.PATIENT_DETAILS}/procedures/${uid}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient procedure details");
  }
};

export const addPatientProcedures = async (data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.post(`${API_ROUTES.PATIENT_DETAILS}/procedures`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient procedure details");
  }
};

export const updatePatientProcedures = async (id,data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.put(`${API_ROUTES.PATIENT_DETAILS}/procedures/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient procedure details");
  }
};



export const getPatientVitals = async (uid,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.get(`${API_ROUTES.PATIENT_DETAILS}/vitals/${uid}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient vital details");
  }
};

export const addPatientVitals = async (data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.post(`${API_ROUTES.PATIENT_DETAILS}/vitals`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient vital details");
  }
};

export const updatePatientVitals = async (id,data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.put(`${API_ROUTES.PATIENT_DETAILS}/vitals/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient vital details");
  }
};



export const getPatientBloodGlucoses = async (uid,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.get(`${API_ROUTES.PATIENT_DETAILS}/blood-glucoses/${uid}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient blood glucoses details");
  }
};

export const addPatientBloodGlucoses = async (data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.post(`${API_ROUTES.PATIENT_DETAILS}/blood-glucoses`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient blood glucoses details");
  }
};

export const updatePatientBloodGlucoses = async (id,data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.put(`${API_ROUTES.PATIENT_DETAILS}/blood-glucoses/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient blood glucoses details");
  }
};



export const getPatientBloodTransfusions = async (uid,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.get(`${API_ROUTES.PATIENT_DETAILS}/blood-transfusions/${uid}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient blood transfusions details");
  }
};

export const addPatientBloodTransfusions = async (data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.post(`${API_ROUTES.PATIENT_DETAILS}/blood-transfusions`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient blood transfusions details");
  }
};

export const updatePatientBloodTransfusions = async (id,data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.put(`${API_ROUTES.PATIENT_DETAILS}/blood-transfusions/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient blood transfusions details");
  }
};



export const getPatientIOCharts = async (uid,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.get(`${API_ROUTES.PATIENT_DETAILS}/io-charts/${uid}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient io charts details");
  }
};

export const addPatientIOCharts = async (data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.post(`${API_ROUTES.PATIENT_DETAILS}/io-charts`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient io charts details");
  }
};

export const updatePatientIOCharts = async (id,data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.put(`${API_ROUTES.PATIENT_DETAILS}/io-charts/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient io charts details");
  }
};



export const getPatientTreatments = async (uid,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.get(`${API_ROUTES.PATIENT_DETAILS}/treatments/${uid}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient treatments details");
  }
};

export const addPatientTreatments = async (data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.post(`${API_ROUTES.PATIENT_DETAILS}/treatments`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient treatments details");
  }
};

export const updatePatientTreatments = async (id,data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.put(`${API_ROUTES.PATIENT_DETAILS}/treatments/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient treatments details");
  }
};



export const getPatientMedications = async (uid,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.get(`${API_ROUTES.PATIENT_DETAILS}/medications/${uid}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient medications details");
  }
};

export const addPatientMedications = async (data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.post(`${API_ROUTES.PATIENT_DETAILS}/medications`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient medications details");
  }
};

export const updatePatientMedications = async (id,data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.put(`${API_ROUTES.PATIENT_DETAILS}/medications/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient medications details");
  }
};



export const getPatientVisits = async (uid,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.get(`${API_ROUTES.PATIENT_DETAILS}/visits/${uid}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient visits details");
  }
};

export const addPatientVisits = async (data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.post(`${API_ROUTES.PATIENT_DETAILS}/visits`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient visits details");
  }
};

export const updatePatientVisits = async (id,data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.put(`${API_ROUTES.PATIENT_DETAILS}/visits/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient visits details");
  }
};



export const getPatientNotes = async (uid,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.get(`${API_ROUTES.PATIENT_DETAILS}/notes/${uid}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient notes details");
  }
};

export const addPatientNotes = async (data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.post(`${API_ROUTES.PATIENT_DETAILS}/notes`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient notes details");
  }
};

export const updatePatientNotes = async (id,data,token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.put(`${API_ROUTES.PATIENT_DETAILS}/notes/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get patient notes details");
  }
};