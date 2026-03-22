import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../assets/logo.png";

function TeacherLogin() {

const [id, setId] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async (e) => {
e.preventDefault();

try {

const res = await axios.post(
"https://campushub-backend-6r2u.onrender.com/api/auth/login",
{
id: id,
password: password,
role: "teacher"
}
);

localStorage.setItem("teacherId", res.data.id);
localStorage.setItem("teacherName", res.data.name);
localStorage.setItem("role", "teacher");

navigate("/teacher-dashboard");

} catch (err) {
alert("Invalid Login");
}

};

return (

<div className="login-container">

<div className="login-card teacher">

<img src={logo} alt="logo" className="logo" />

<h2>Campus Hub</h2>
<p className="subtitle">Teacher Login</p>

<form onSubmit={handleLogin}>

<input
type="text"
placeholder="Teacher ID"
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

export default TeacherLogin;