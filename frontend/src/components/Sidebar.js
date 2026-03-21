import React from "react";
import { Link } from "react-router-dom";

function Sidebar(){

return(

<div style={sidebar}>

<h2 style={logo}>Admin Panel</h2>

<Link style={link} to="/dashboard">Dashboard</Link>
<Link style={link} to="/students">Students</Link>
<Link style={link} to="/Teachers">Teacher</Link>
<Link style={link} to="/attendance">Attendance</Link>
<Link style={link} to="/notices">Notices</Link>
<Link style={link} to="/results">Results</Link>

</div>

)

}

const sidebar={
width:"220px",
height:"100vh",
background:"#1e293b",
position:"fixed",
left:"0",
top:"0",
padding:"20px",
display:"flex",
flexDirection:"column",
gap:"15px"
}

const logo={
color:"white",
marginBottom:"20px"
}

const link={
color:"white",
textDecoration:"none",
background:"#334155",
padding:"10px",
borderRadius:"6px"
}

export default Sidebar;