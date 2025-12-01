import { Link } from "react-router-dom"
import "../styles/signin.css";


export default function SignIn() {
  return (
    <div className="auth-page">
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
