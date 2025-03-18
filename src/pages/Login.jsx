import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("https://cookbook-server-2.onrender.com/users");
      const users = response.data;

      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        setMessage("Login successful!");
      } else {
        setMessage("Invalid email or password!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Try again!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {message && <p className={message === "Login successful!" ? "success-message" : "error-message"}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
