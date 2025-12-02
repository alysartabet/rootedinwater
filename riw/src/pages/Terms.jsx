import { Link } from "react-router-dom";
import BackLogo from "../assets/whitelogo.svg";
import "../styles/terms.css";

export default function Terms() {
  return (
    <div className="terms-page">
        <Link to="/account/register" className="back-btn">
                    <img src={BackLogo} alt="Back" className="back-btn-img" />
                  </Link>

      <h1 className="terms-title">Terms & Conditions</h1>

      <div className="terms-card">
        <ol>
          <li>
            <strong>Eligibility and Role-Based Registration</strong>
            <p>
              RIW accounts are exclusively available to Students, Farmers,
              and Researchers (“Users”).
            </p>
            <p>
              During registration, you must select your role truthfully.
              Providing false information may result in termination of your account.
            </p>
          </li>

          <li>
            <strong>Verification Requirements</strong>
            <p>
              All users must provide verification documents corresponding
              to their role within 14 days of registration.
            </p>
            <ul>
              <li>Students: proof of enrollment.</li>
              <li>Farmers: farm license, cooperative membership, farm ID, etc.</li>
              <li>Researchers: institutional affiliation or accreditation.</li>
            </ul>
            <p>
              If verification documents are not received within 14 days, RIW
              may delete your account and associated data.
            </p>
          </li>

          <li>
            <strong>Access to Features & Privileges</strong>
            <p>Before verification, users may only access limited platform features.</p>
          </li>
        </ol>
      </div>

      {/* Checkbox */}
      <label className="terms-checkbox">
        <input type="checkbox" />
        <span>I have read and accept the terms and conditions.*</span>
      </label>

      {/* Continue button */}
      <button className="terms-btn">Register!</button>
      <div className="progress-wrapper">
         <div className="progress-bar inactive"></div>
         <div className="progress-bar active"></div>
      </div>


      <p className="terms-footer">
        Already have an account?{" "}
        <Link to="/account/sign-in">Sign In</Link>
      </p>
    </div>
  );
}
