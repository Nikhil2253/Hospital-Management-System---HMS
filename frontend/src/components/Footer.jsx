import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Left Section - Logo and Tagline */}
      <div className="footer-left">
        <div className="footer-logo">ManageIt</div>
        <p className="footer-tagline">Simplify Hospital Management</p>
      </div>

      {/* Middle Section - Navigation Links */}
      <div className="footer-middle">
        <a href="#" className="footer-link">Home</a>
        <a href="#" className="footer-link">About</a>
        <a href="#" className="footer-link">Services</a>
        <a href="#" className="footer-link">Contact</a>
      </div>

      {/* Right Section - Contact Info / Social */}
      <div className="footer-right">
        <p className="footer-contact">Contact: manageit@hospital.com</p>
        <p className="footer-contact">Phone: +1 234 567 890</p>
         <div className="social-icons">
          <img src="/icons/facebook.svg" alt="Facebook" />
          <img src="/icons/linkedin.svg" alt="LinkedIn" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
