import { useNavigate } from "react-router-dom";

export const authRoute = (roles) => {
  const navigate = useNavigate();
  if (!roles.includes(JSON.parse(localStorage.getItem("user")).role)) {
    navigate("/home", { replace: true });
  }
};
