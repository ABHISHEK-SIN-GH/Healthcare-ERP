import { toast } from "react-toastify";

export const Notify = (type, text) => {
  if (type == "info") {
    toast.info(text);
  }
  if (type == "success") {
    toast.success(text);
  }
  if (type == "warning") {
    toast.warning(text);
  }
  if (type == "error") {
    toast.error(text);
  }
};