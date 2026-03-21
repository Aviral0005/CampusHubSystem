import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard(){

const navigate = useNavigate();

const role = localStorage.getItem("role");

/* ================= ROLE SECURITY ================= */

useEffect(()=>{

if(!role || role !== "admin"){
navigate("/admin-login");
}

},[]);

const [stats,setStats] = useState({
students:0,
attendance:0,
notices:0,
results:0
});

/* ================= LOGOUT ================= */

const logout = () => {

localStorage.clear();

navigate("/");

};

/* ================= LOAD DASHBOARD DATA ================= */

useEffect(()=>{

fetch("http://localhost:5000/dashboard")
.then(res=>res.json())
.then(data=>setStats(data));

},[]);

return(

<div>

<Sidebar/>

<div style={page}>

{/* HEADER */}

<div style={header}>

<h1 style={title}>📊 Admin Dashboard</h1>

<button
onClick={logout}
style={logoutBtn}
>
Logout
</button>

</div>

{/* DASHBOARD CARDS */}

<div style={grid}>

<div style={cardBlue}>
<h2>{stats.students}</h2>
<p>Total Students</p>
</div>

<div style={cardGreen}>
<h2>{stats.attendance}</h2>
<p>Attendance Records</p>
</div>

<div style={cardPurple}>
<h2>{stats.notices}</h2>
<p>Notices</p>
</div>

<div style={cardOrange}>
<h2>{stats.results}</h2>
<p>Results</p>
</div>

<div style={cardBlue}>
<h2>{stats.teachers}</h2>
<p>Total Teachers</p>
</div>

</div>

</div>

</div>

)

}

/* ---------- STYLES ---------- */

const page={
marginLeft:"240px",
padding:"40px",
background:"#f4f6f9",
minHeight:"100vh"
}

const header={
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"30px"
}

const title={
marginBottom:"0"
}

const logoutBtn={
padding:"8px 16px",
background:"red",
color:"#fff",
border:"none",
borderRadius:"6px",
cursor:"pointer"
}

const grid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"25px"
}

const baseCard={
padding:"35px",
borderRadius:"14px",
color:"white",
textAlign:"center",
fontSize:"22px",
boxShadow:"0 10px 25px rgba(0,0,0,0.2)"
}

const cardBlue={
...baseCard,
background:"linear-gradient(135deg,#3498db,#2980b9)"
}

const cardGreen={
...baseCard,
background:"linear-gradient(135deg,#2ecc71,#27ae60)"
}

const cardPurple={
...baseCard,
background:"linear-gradient(135deg,#9b59b6,#8e44ad)"
}

const cardOrange={
...baseCard,
background:"linear-gradient(135deg,#e67e22,#d35400)"
}

export default Dashboard;