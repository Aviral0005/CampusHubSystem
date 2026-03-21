import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../assets/logo.png";

function Login() {

const [id, setId] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleLogin = async (e) => {
e.preventDefault();

try {
const res = await axios.post(
"http://localhost:5000/api/auth/login",
{
id,
password,
role: "student"
}
);

localStorage.setItem("studentId", res.data.id);
localStorage.setItem("studentName", res.data.name);
localStorage.setItem("role", "student");

navigate("/student-dashboard");

} catch (err) {
alert("Invalid Login");
}
};

return (

<div className="login-container">

<div className="login-card">

<img src={logo} alt="logo" className="logo" />

<h2>Campus Hub</h2>
<p className="subtitle">Student Login</p>

<form onSubmit={handleLogin}>

<input
type="text"
placeholder="User ID"
value={id}
onChange={(e) => setId(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>

<button type="submit">Sign In</button>

</form>

<p className="forgot">Forgot Password?</p>
<p className="credit">Designed by Aviral Verma</p>

</div>

</div>

);

}

export default Login;