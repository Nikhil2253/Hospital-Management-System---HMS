import "../styles/Navbar.css"
import Logo from "../../public/Logo.png"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="hms-logo">
            <img src={Logo} alt="" className="logo-img" />
            <div className="logo-name">ManageIt</div>
        </div>
        <div className="entry-btns">
            <Link className="signin-btn" to={`/Register`}>Sign Up</Link>
            <Link className="login-btn" to={`/Login`}>Login</Link>
        </div>
    </div>
  )
}

export default Navbar;