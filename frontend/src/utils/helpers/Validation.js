import { Notify } from "../notifier";

export const handleValidation = (data) => {
  let valid = true;
  Object.keys(data).forEach((field) => {
    if (!data[field]) {
      Notify("error", `${field} is required`);
      valid = false;
    }
  });
  return valid;
};
