import React, { useState } from 'react'
import FrontdeskImg from "../../assets/dashboard/Frontdesk.png";
import FDMaintenance from './FDMaintenance';
import FDContent from './FDContent';

export default function FrontDesk() {
  const [maintenance,setMaintenance] = useState(true);
  return (
    <>
      {
        (maintenance) ?
        <FDMaintenance FrontdeskImg={FrontdeskImg}/> :
        <FDContent/>
      }
    </>
  )
}
