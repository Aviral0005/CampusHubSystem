import React from "react";
import { Link } from "react-router-dom";

function TeacherSidebar(){

return(

<div style={sidebar}>

<h2 style={{color:"white"}}>Teacher Panel</h2>

<Link style={link} to="/teacher-dashboard/attendance">
Attendance
</Link>

<Link style={link} to="/teacher-dashboard/attendance-list">
Attendance List
</Link>

<Link style={link} to="/teacher-dashboard/marks">
Upload Marks
</Link>

<Link style={link} to="/teacher-dashboard/study-material">
Study Material
</Link>

</div>

)

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

export default TeacherSidebar;