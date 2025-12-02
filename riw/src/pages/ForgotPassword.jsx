import { Link } from "react-router-dom";
import BackLogo from "../assets/whitelogo.svg";
import fbicon from "../assets/icons/facebookicon.svg";
import googleicon from "../assets/icons/googleicon.svg";
import "../styles/forgotpassword.css";


export default function ForgotPassword() {
  return (
    <div className="auth-page">
          <Link to="/account/sign-in" className="back-btn">
            <img src={BackLogo} alt="Back" className="back-btn-img" />
          </Link>
          <div className="social-login">
         <p className="social-or">or</p>

        <button className="forgot-social-btn forgot-fb-btn">
             <img src={fbicon} alt="Facebook" className="social-icon" />
             Sign In with Facebook
        </button>

        <button className="forgot-social-btn forgot-google-btn">
             <img src={googleicon} alt="Google" className="social-icon" />
             Sign In with Google
        </button>
    </div>
      <div className="forgot-card">
        <h1 className="forgot-title">
          Forgot <br />
          <span className="forgot-title-indent">Password</span>
        </h1>

        <form className="forgot-form">
          <label className="forgot-label">
            Email
            <span className="forgot-note">
              Enter email associated with this account
            </span>

            <input
              type="email"
              className="forgot-input"
              placeholder="you@example.com"
            />
          </label>

          <button className="forgot-btn">
            Send Verification Code
          </button>
        </form>

      </div>
    </div>
  );
}
