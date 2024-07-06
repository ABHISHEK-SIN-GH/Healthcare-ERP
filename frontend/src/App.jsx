import { Outlet } from "react-router-dom"
import "./styles/mobile.css"
import "./styles/tablet.css"
import "./styles/smallLaptop.css"
import "./styles/laptop.css"
import "./styles/desktop.css"
import "react-toastify/dist/ReactToastify.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

function App() {
  try {
    const username = JSON.parse(localStorage.getItem("user")).username;
    console.log(username);
  } catch (error) {
    console.log("Error",error);
  }
  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
