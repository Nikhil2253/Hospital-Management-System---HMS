import { Link } from "react-router-dom"
import "../styles/Login.css";

const Register = () => {
  return (
    <div className="login-options">
      <Link to={`/Register/doctor`} className="doctor">Doctor</Link>
      <Link to={`/Register/patient`} className="patient">Patient</Link>
      <Link to={`/Register/hospital`} className="hospital">Hospital</Link>
    </div>
  )
}

export default Register;