import { Link } from "react-router-dom"
import "../styles/Login.css";

const Login = () => {
  return (
    <div className="login-options">
      <Link to={`/Login/doctor`} className="doctor">Doctor</Link>
      <Link to={`/Login/patient`} className="patient">Patient</Link>
      <Link to={`/Login/hospital`} className="hospital">Hospital</Link>
    </div>
  )
}

export default Login;