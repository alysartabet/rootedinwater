import { Link } from "react-router-dom"
import BackLogo from "../assets/whitelogo.svg";
import fbicon from "../assets/icons/facebookicon.svg";
import googleicon from "../assets/icons/googleicon.svg";
import "../styles/signin.css";


export default function SignIn() {
  return (
    <div className="auth-page">
      <Link to="/" className="back-btn">
        <img src={BackLogo} alt="Back" className="back-btn-img" />
      </Link>

                <div className="social-login">
               <p className="social-or">or</p>
      
              <button className="social-btn fb-btn">
                   <img src={fbicon} alt="Facebook" className="social-icon" />
                   Sign In with Facebook
              </button>
      
              <button className="social-btn google-btn">
                   <img src={googleicon} alt="Google" className="social-icon" />
                   Sign In with Google
              </button>
          </div>
      <div className="auth-card" aria-label="Sign in">
        <h1 className="auth-title">Sign In</h1>
        <form className="auth-form">
          <label className="auth-label">
            Email
            <input type="email" name="email" className="auth-input" placeholder="you@example.com" />
          </label>

          <label className="auth-label">
            Password
            <input type="password" name="password" className="auth-input" placeholder="••••••••" />
          </label>

          <div className="auth-row">
            <Link to="/account/forgot-password" className="auth-link">Forgot password?</Link>
          </div>

          <button type="submit" className="auth-primary-btn">Sign In</button>
        </form>

        <p className="auth-footer-text">
          New here? <Link to="/account/register" className="auth-link">Create an account</Link>
        </p>

        <p className="auth-footer-text">
          By continuing you agree to our <Link to="/account/terms" className="auth-link">Terms & Conditions</Link>.
        </p>
      </div>
    </div>
  );
}
