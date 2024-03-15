/* Import React / React-Router-Dom Features  */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

/* Import Axios Service */
import authService from "../services/auth.service";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  // Initialize navigate
  const navigate = useNavigate();

  const { signup } = authService;

  const handleSignUpSubmit = (e) => {
    // Prevent Default Actions of the Form -> refresh the page.
    e.preventDefault();

    const reqBody = { email, password, name, role };

    signup(reqBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
		console.log(error)
        const errorDescription = error.message;
        setError(errorDescription);
      });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="signup-card">
      <h1>Sign-up Page</h1>
      <form onSubmit={handleSignUpSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div><div>
          <label>Role:</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="doctor">Doctor</option>
            <option value="staff">Staff</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        <div className="login-link">
          <Link to="/login">Already a user ?</Link>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Signup;










