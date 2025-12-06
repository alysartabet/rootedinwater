import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import BackLogo from "../assets/whitelogo.svg";
import fbicon from "../assets/icons/facebookicon.svg";
import googleicon from "../assets/icons/googleicon.svg";

import "../styles/signin.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --------------------------
  // EMAIL WITH PASSWORD LOGIN (Firebase + Mongo)
  // --------------------------
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Firebase sign-in
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Sends UID ans email to backend to sync profile
      const res = await fetch("http://localhost:4000/api/auth/firebase-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed.");
        setLoading(false);
        return;
      }

      //Saves token
      localStorage.setItem("riw_token", data.token);

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  // --------------------------
  // GOOGLE LOGIN
  // --------------------------
  async function handleGoogleLogin() {
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

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


      localStorage.setItem("riw_token", data.token);

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Google login failed.");
    }
  }

  return (
    <div className="auth-page">
      <Link to="/" className="back-btn">
        <img src={BackLogo} alt="Back" className="back-btn-img" />
      </Link>

      <div className="social-login">
        <p className="social-or">or</p>

        <button className="signin-social-btn signin-fb-btn">
          <img src={fbicon} alt="Facebook" className="social-icon" />
          Sign In with Facebook
        </button>

        <button
          className="signin-social-btn signin-google-btn"
          onClick={handleGoogleLogin}
        >
          <img src={googleicon} alt="Google" className="social-icon" />
          Sign In with Google
        </button>
      </div>

      <div className="auth-card" aria-label="Sign in">
        <h1 className="auth-title">Sign In</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            Email
            <input
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="auth-label">
            Password
            <input
              type="password"
              className="auth-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <div className="auth-row">
  <button
    type="button"
    className="auth-link reset-btn"
    onClick={() => navigate("/account/forgot-password")}
  >
    Forgot password?
  </button>
</div>


          <button
            type="submit"
            className="auth-primary-btn"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-footer-text">
          New here?{" "}
          <Link to="/account/register" className="auth-link">
            Create an account
          </Link>
        </p>

        <p className="auth-footer-text">
          By continuing you agree to our{" "}
          <Link to="/account/terms" className="auth-link">
            Terms & Conditions
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
