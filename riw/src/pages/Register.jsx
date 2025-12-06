import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import BackLogo from "../assets/whitelogo.svg";
import fbicon from "../assets/icons/facebookicon.svg";
import googleicon from "../assets/icons/googleicon.svg";

import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

import "../styles/register.css";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    affiliation: "",
    researchArea: "",
    specificArea: "",
  });

  const [error, setError] = useState("");

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  function handleGoToTerms(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    localStorage.setItem("pending_registration", JSON.stringify(form));

    navigate("/account/terms");
  }

  // ----------------------------
  // GOOGLE REGISTER (Firebase + MongoDB)
  // ----------------------------
  async function handleGoogleRegister() {
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Sends Google user to backend
      const res = await fetch("http://localhost:4000/api/auth/firebase-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        }),
      });

      const data = await res.json();

      // Save token and then redirect
      localStorage.setItem("riw_token", data.token);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Google registration failed.");
    }
  }

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

          <button
            className="register-social-btn register-google-btn"
            onClick={handleGoogleRegister}
          >
            <img src={googleicon} alt="Google" className="social-icon" />
            Register with Google
          </button>

          <p className="register-or">Or</p>

          {/* PASSWORD */}
          <label className="register-label medium mobile-password">
            <span className="label-text">Password*</span>
            <input
              type="password"
              name="password"
              className="register-input medium"
              value={form.password}
              onChange={updateField}
              required
            />
          </label>

          {/* RESEARCHER SECTION */}
          <div className="researcher-header-row">
            <h3 className="researcher-title">Researcher</h3>
            <h3 className="describe-title">
              Which Best <br /> Describes You?*
            </h3>
          </div>

          <label className="register-label">
            Affiliation/Institution
            <input
              type="text"
              name="affiliation"
              className="register-input researcher-input"
              value={form.affiliation}
              onChange={updateField}
            />
          </label>

          <label className="register-label">
            Area of Research
            <select
              name="researchArea"
              className="register-input researcher-input"
              value={form.researchArea}
              onChange={updateField}
            >
              <option value="">Choose an area...</option>
              <option>Agriculture</option>
              <option>Soil Science</option>
              <option>Water Quality</option>
              <option>Urban Planning</option>
            </select>
          </label>

          <label className="register-label">
            Specific Area
            <input
              type="text"
              name="specificArea"
              className="register-input researcher-input"
              value={form.specificArea}
              onChange={updateField}
            />
          </label>
        </div>

        {/* RIGHT SIDE */}
        <div className="register-right">
          <div className="register-row">
            <label className="register-label small">
              First Name*
              <input
                type="text"
                name="firstName"
                className="register-input"
                value={form.firstName}
                onChange={updateField}
                required
              />
            </label>

            <label className="register-label small">
              Middle Initial
              <input type="text" className="register-input" />
            </label>
          </div>

          <div className="register-row">
            <label className="register-label small">
              Last Name*
              <input
                type="text"
                name="lastName"
                className="register-input"
                value={form.lastName}
                onChange={updateField}
                required
              />
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

          {/* CONFIRM PASSWORD */}
          <label className="register-label full-width">
            Confirm Password*
            <input
              type="password"
              name="confirmPassword"
              className="register-input"
              value={form.confirmPassword}
              onChange={updateField}
              required
            />
          </label>

          {/* EMAIL */}
          <label className="register-label full-width">
            Email Address*
            <input
              type="email"
              name="email"
              className="register-input"
              value={form.email}
              onChange={updateField}
              required
            />
          </label>

          {/* ERROR */}
          {error && <p className="auth-error">{error}</p>}

          {/* SUBMIT */}
          <div className="register-bottom-block">
            <button className="register-btn" onClick={handleGoToTerms}>
              Register!
            </button>

            <div className="register-progress-wrapper">
              <div className="register-progress-bar active"></div>
              <div className="register-progress-bar inactive"></div>
            </div>
          </div>

          <p className="register-footer">
            Already have an account?{" "}
            <Link to="/account/sign-in">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
