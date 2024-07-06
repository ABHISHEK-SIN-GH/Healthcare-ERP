export const BASE_URL = 'http://localhost:8000'; 
// export const BASE_URL = 'https://erp-hc-server.onrender.com'; 

export const API_ROUTES = {
  STATIC: `${BASE_URL}/static`,
  AUTH: `${BASE_URL}/api/auth/login`,
  CONFIG: `${BASE_URL}/api/config`,
  USER: `${BASE_URL}/api/users`,
  ADMIN: `${BASE_URL}/api/admins`,
  FRONTDESK: `${BASE_URL}/api/frontdesks`,
  PHARMACIST: `${BASE_URL}/api/pharmacists`,
  NURSE: `${BASE_URL}/api/nurses`,
  DOCTOR: `${BASE_URL}/api/doctors`,
  ALL_PATIENT: `${BASE_URL}/api/patients/all`,
  OPD_PATIENT: `${BASE_URL}/api/patients/opd`,
  IPD_PATIENT: `${BASE_URL}/api/patients/ipd`,
  PATIENT_DETAILS: `${BASE_URL}/api/patientDetails`,
  MEDICINE: `${BASE_URL}/api/medicines`,
  UPLOAD: `${BASE_URL}/api/uploads`,
};