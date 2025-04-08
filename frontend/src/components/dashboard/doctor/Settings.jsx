import { useState } from "react"
import UpdateProfile from "./UpdateProfile"
import UpdatePassword from "./UpdatePassword"

const Settings = () => {
  const [opt,setOpt]=useState("Update Profile");
  return (
    <div className="hos-containers">
      <div className="appointment-nav">
        <h2 className="nav-title">Settings</h2>
        <button className={`nav-btn ${(opt==="Update Profile")?"active":""}`} onClick={()=>{setOpt("Update Profile")}}>Update Profile</button>
        <button className={`nav-btn ${(opt==="Update Password")?"active":""}`} onClick={()=>{setOpt("Update Password")}}>Update Pssword</button>  
         </div>

         <div className="appointment-content">
          {
            (opt==="Update Profile") && <UpdateProfile></UpdateProfile>
          }
          {
            (opt==="Update Password") && <UpdatePassword></UpdatePassword>
          }
         </div>
      
    </div>
  )
}

export default Settings;