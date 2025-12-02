import { Link } from "react-router-dom";
import BackLogo from "../assets/whitelogo.svg";
import fbicon from "../assets/icons/facebookicon.svg";
import googleicon from "../assets/icons/googleicon.svg";
import "../styles/register.css";

export default function CreateAccount() {
  return (
    <div className="auth-register-page">
        <Link to="/account/sign-in" className="back-btn">
                <img src={BackLogo} alt="Back" className="back-btn-img" />
              </Link>
      <div className="register-container">

        {/* LEFT SIDE */}
        <div className="register-left">
          <h1 className="register-title">Create an Account</h1>

          <button className="register-social-btn register-fb-btn">
            <img src={fbicon} alt="Facebook" className="social-icon" />
            Register with Facebook
          </button>

          <button className="register-social-btn register-google-btn">
            <img src={googleicon} alt="Google" className="social-icon" />
            Register with Google
          </button>

          <p className="register-or">Or</p>

          {/* Password for left side */}
          <label className="register-label medium mobile-password">
             <span className="label-text">Password*</span>
            <input type="password" className="register-input medium" />
          </label>

          {/* Researcher Section */}
          <div className="researcher-header-row">
            <h3 className="researcher-title">Researcher</h3>
            <h3 className="describe-title">Which Best<br/>Describes You?*</h3>
            </div>


          <label className="register-label">
            Affiliation/Institution
            <input type="text" className="register-input researcher-input" />
          </label>

          <label className="register-label">
            Area of Research
            <select className="register-input researcher-input">
            <option>Choose an area...</option>
            </select>
          </label>

          <label className="register-label">
            Specific Area
            <input type="text" className="register-input researcher-input" />
          </label>

        </div>

        {/* RIGHT SIDE */}
        <div className="register-right">

          <div className="register-row">
            <label className="register-label small">
              First Name*
              <input type="text" className="register-input" />
            </label>

            <label className="register-label small">
              Middle Initial
              <input type="text" className="register-input" />
            </label>
          </div>

          <div className="register-row">
            <label className="register-label small">
              Last Name*
              <input type="text" className="register-input " />
            </label>

            <label className="register-label small">
              Suffix
              <select className="register-input small">
                <option></option>
                <option>Jr.</option>
                <option>Sr.</option>
                <option>III</option>
              </select>
            </label>
          </div>

            
        <label className="register-label full-width">
        Confirm Password*
        <input type="password" className="register-input" />
        </label>

        <label className="register-label full-width">
         Email Address
        <input type="email" className="register-input" />
        </label>


          <button className="register-btn">Register!</button>

          <p className="register-footer">
            Already have an account? <Link to="/account/sign-in">Sign In</Link>
          </p>

        </div>

      </div>
    </div>
  );
}
