import React from "react";
import { Link } from "react-router-dom";

function StudentSidebar() {
return (
<div style={sidebar}>

<h2 style={{color:"white"}}>Student Panel</h2>

<Link style={link} to="/student-dashboard">Dashboard</Link>

<Link style={link} to="/student-attendance">Attendance</Link>

<Link style={link} to="/student-results">Results</Link>

<Link style={link} to="/student-notices">Notices</Link>

<Link style={link} to="/student-materials">
Study Materials
</Link>

</div>
);
}

const sidebar={
width:"220px",
background:"#1e293b",
minHeight:"100vh",
padding:"20px",
display:"flex",
flexDirection:"column",
gap:"15px"
}

const link={
color:"white",
textDecoration:"none",
background:"#334155",
padding:"10px",
borderRadius:"5px"
}

export default StudentSidebar;