import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackLogo from "../assets/whitelogo.svg";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/terms.css";

export default function Terms() {
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleFinalRegister() {
    if (!accepted) {
      setError("You must accept the Terms to continue.");
      return;
    }

    const saved = localStorage.getItem("pending_registration");
    if (!saved) {
      setError("Registration data missing. Please fill the form again.");
      navigate("/account/register");
      return;
    }

    const form = JSON.parse(saved);

    try {
      // Creates Firebase Auth user
      const fbUser = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // Sends profile to Mongo
      const res = await fetch("http://localhost:4000/api/auth/firebase-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: fbUser.user.uid,
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          affiliation: form.affiliation,
          researchArea: form.researchArea,
          specificArea: form.specificArea,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      //Saves token & redirect home
      localStorage.setItem("riw_token", data.token);
      localStorage.removeItem("pending_registration");

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Registration error: " + err.message);
    }
  }

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
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <span>I have read and accept the terms and conditions.*</span>
      </label>

      {error && <p className="auth-error">{error}</p>}

      {/* Register button */}
      <button
        className="terms-btn"
        disabled={!accepted}
        onClick={handleFinalRegister}
      >
        Register!
      </button>

      <div className="progress-wrapper">
        <div className="progress-bar inactive"></div>
        <div className="progress-bar active"></div>
      </div>

      <p className="terms-footer">
        Already have an account? <Link to="/account/sign-in">Sign In</Link>
      </p>
    </div>
  );
}
