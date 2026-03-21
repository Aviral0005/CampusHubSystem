import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./Login.css";
import logo from "../assets/logo.png";

function AdminLogin(){

const [adminId,setAdminId] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async(e)=>{
e.preventDefault();

try{

const res = await axios.post(
"http://localhost:5000/api/auth/login",
{
id: adminId,
password: password,
role:"admin"
}
);

localStorage.setItem("adminId",res.data.id);
localStorage.setItem("role","admin");

navigate("/dashboard");

}catch(err){
alert("Invalid Login");
}
};

return(

<div className="login-container">

<div className="login-card admin">

<img src={logo} alt="logo" className="logo"/>

<h2>Campus Hub</h2>
<p className="subtitle">Admin Login</p>

<form onSubmit={handleLogin}>

<input
type="text"
placeholder="Admin ID"
value={adminId}
onChange={(e)=>setAdminId(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button type="submit">Sign In</button>

</form>

<p className="forgot">Forgot Password?</p>

<p className="credit">Designed by Aviral Verma</p>

</div>

</div>

)

}

export default AdminLogin;