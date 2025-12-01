import { Link } from "react-router-dom";
import BackLogo from "../assets/whitelogo.svg";
import "../styles/forgotpassword.css";

export default function ForgotPassword() {
  return (
    <div className="auth-page">
          <Link to="/account/sign-in" className="back-btn">
            <img src={BackLogo} alt="Back" className="back-btn-img" />
          </Link>
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
