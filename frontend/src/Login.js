
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../assets/logo.png";

function Login() {

const navigate = useNavigate();

const [id,setId] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async () => {

const res = await fetch("http://localhost:5000/api/auth/login",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({
id:id,
password:password,
role:"student"
})
});

const data = await res.json();

if(res.ok){

localStorage.setItem("studentId", data.id);
localStorage.setItem("studentName", data.name);

navigate("/student-dashboard");

}else{
alert("Invalid Login");
}

};

return (

<div className="login-container">

<div className="login-card">

<img src={logo} alt="logo" className="logo"/>

<h2>Campus Hub Login</h2>

<input
type="text"
placeholder="Student ID"
value={id}
onChange={(e)=>setId(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleLogin}>Sign In</button>

<p className="forgot">Forgot Password?</p>

</div>

</div>

);

}

export default Login;