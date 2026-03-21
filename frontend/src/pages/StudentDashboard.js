import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import { FaBell } from "react-icons/fa";
import StudentTodo from "../components/StudentTodo";

function StudentDashboard(){

const navigate = useNavigate();

const studentName = localStorage.getItem("studentName");
const studentId = localStorage.getItem("studentId");
const role = localStorage.getItem("role");

/* ================= ROLE SECURITY ================= */

useEffect(()=>{

if(!role || role !== "student"){
navigate("/login");
}

},[]);

const [course,setCourse] = useState("");
const [attendance,setAttendance] = useState(0);
const [photoUrl,setPhotoUrl] = useState("");

const [notices,setNotices] = useState([]);
const [noticeCount,setNoticeCount] = useState(0);
const [showNotices,setShowNotices] = useState(false);

const [time,setTime] = useState(new Date());

const firstLetter = studentName ? studentName.charAt(0).toUpperCase() : "?";

/* ================= LOGOUT ================= */

const logout = () => {

localStorage.clear();

navigate("/");

};

/* ================= LOAD DATA ================= */

useEffect(()=>{

fetch(`http://localhost:5000/api/students/${studentId}`)
.then(res=>res.json())
.then(data=>{
if(data){
setCourse(data.course);
setPhotoUrl(data.photo);
}
});

/* ATTENDANCE */

fetch(`http://localhost:5000/attendance/${studentId}`)
.then(res=>res.json())
.then(data=>{

if(data.length>0){

let present = data.filter(a=>a.status==="Present").length;
let percentage = ((present/data.length)*100).toFixed(0);

setAttendance(percentage);

}

});

/* NOTICES */

fetch("http://localhost:5000/notices")
.then(res=>res.json())
.then(data=>{
setNotices(data);
setNoticeCount(data.length);
});

},[studentId]);

/* ================= LIVE CLOCK ================= */

useEffect(()=>{

const timer = setInterval(()=>{
setTime(new Date());
},1000);

return ()=>clearInterval(timer);

},[]);

/* ================= PHOTO UPLOAD ================= */

const uploadPhoto = async(file)=>{

if(!file){
alert("Select photo");
return;
}

const formData = new FormData();
formData.append("photo",file);

await fetch(`http://localhost:5000/upload-student-photo/${studentId}`,{
method:"POST",
body:formData
});

window.location.reload();

};

/* ================= NOTIFICATION ================= */

const toggleNotices = ()=>{

setShowNotices(!showNotices);

if(!showNotices){
setNoticeCount(0);
}

};

return(

<div style={{display:"flex"}}>

<StudentSidebar/>

<div style={main}>

{/* ================= HEADER ================= */}

<div style={header}>

<div>

<h2 style={welcome}>Welcome {studentName} 👋</h2>

<p style={info}>
<b>Course :</b> {course} &nbsp;&nbsp;
<b>ID :</b> {studentId}
</p>

<div style={timeBox}>
{time.toLocaleString()}
</div>

</div>

<div style={rightIcons}>

{/* BELL */}

<div style={bellContainer} onClick={toggleNotices}>

<FaBell size={20}/>

{noticeCount>0 && (

<div style={badge}>{noticeCount}</div>

)}

</div>

{/* PROFILE */}

<div style={avatarContainer}>

{photoUrl ?

<img
src={`http://localhost:5000/uploads/${photoUrl}`}
alt="profile"
style={avatarImg}
/>

:

<div style={avatar}>
{firstLetter}
</div>

}

<label htmlFor="photoUpload" style={editIcon}>
✏️
</label>

<input
id="photoUpload"
type="file"
style={{display:"none"}}
onChange={(e)=>uploadPhoto(e.target.files[0])}
/>

</div>

{/* LOGOUT BUTTON */}

<button
onClick={logout}
style={{
padding:"6px 12px",
background:"red",
color:"#fff",
border:"none",
borderRadius:"5px",
cursor:"pointer"
}}
>
Logout
</button>

</div>

{/* ================= NOTIFICATION LIST ================= */}

{showNotices && (

<div style={dropdown}>

<h4>Notifications</h4>

<div style={noticeList}>

{notices.length===0 && <p>No notices</p>}

{notices.map((n,index)=>(

<div key={index} style={noticeItem}>
<b>{n.title}</b>
<p>{n.description}</p>
</div>

))}

</div>

</div>

)}

</div>

{/* ================= DASHBOARD CARDS ================= */}

<div style={grid}>

<div style={card}>

<h3>Attendance</h3>

<p style={number}>{attendance}%</p>

<div style={progressBar}>
<div style={{
width:`${attendance}%`,
background:"#3498db",
height:"8px",
borderRadius:"5px"
}}></div>
</div>

<p style={label}>Overall Attendance</p>

</div>

<div style={card}>
<h3>Assignments</h3>
<p style={number}>3</p>
<p style={label}>Pending Tasks</p>
</div>

<div style={card}>
<h3>Notices</h3>
<p style={number}>{notices.length}</p>
<p style={label}>New Notices</p>
</div>

<div style={card}>
<h3>Results</h3>
<p style={number}>View</p>
<p style={label}>Check Marks</p>
</div>

</div>

{/* ================= TODO ROUTINE ================= */}

<div style={todoSection}>

<h3>📋 Daily Routine / Todo</h3>

<StudentTodo/>

</div>

{/* ================= QUICK ACTIONS ================= */}

<div style={quickPanel}>

<h3>Quick Actions</h3>

<div style={quickButtons}>

<button style={quickBtn}>View Results</button>

<button style={quickBtn}>Study Materials</button>

<button style={quickBtn}>View Notices</button>

<button style={quickBtn}>Check Attendance</button>

</div>

</div>

</div>

</div>

)

}

/* ================= STYLES ================= */

const main={
flex:1,
padding:"35px",
background:"linear-gradient(135deg,#eef2f3,#dfe9f3)",
minHeight:"100vh"
}

const header={
background:"#fff",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 10px 25px rgba(0,0,0,0.1)",
marginBottom:"25px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
position:"relative"
}

const welcome={
fontSize:"28px",
color:"#2c3e50"
}

const info={
marginTop:"5px"
}

const timeBox={
fontSize:"13px",
color:"#777",
marginTop:"5px"
}

const rightIcons={
display:"flex",
alignItems:"center",
gap:"18px"
}

const bellContainer={
position:"relative",
cursor:"pointer"
}

const badge={
position:"absolute",
top:"-5px",
right:"-5px",
background:"red",
color:"#fff",
borderRadius:"50%",
width:"18px",
height:"18px",
fontSize:"10px",
display:"flex",
alignItems:"center",
justifyContent:"center"
}

const avatarContainer={
position:"relative",
width:"60px",
height:"60px"
}

const avatar={
width:"60px",
height:"60px",
borderRadius:"50%",
background:"linear-gradient(135deg,#3498db,#8e44ad)",
display:"flex",
alignItems:"center",
justifyContent:"center",
color:"#fff",
fontSize:"24px",
fontWeight:"bold"
}

const avatarImg={
width:"60px",
height:"60px",
borderRadius:"50%",
objectFit:"cover"
}

const editIcon={
position:"absolute",
bottom:"-4px",
right:"-4px",
background:"#3498db",
color:"#fff",
borderRadius:"50%",
width:"22px",
height:"22px",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"12px",
cursor:"pointer"
}

const dropdown={
position:"absolute",
right:"20px",
top:"80px",
width:"300px",
background:"#fff",
borderRadius:"10px",
boxShadow:"0 8px 25px rgba(0,0,0,0.2)",
padding:"15px"
}

const noticeList={
maxHeight:"200px",
overflowY:"auto"
}

const noticeItem={
borderBottom:"1px solid #eee",
padding:"8px 0"
}

const grid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px"
}

const card={
background:"#fff",
padding:"30px",
borderRadius:"12px",
boxShadow:"0 6px 18px rgba(0,0,0,0.08)",
textAlign:"center"
}

const number={
fontSize:"34px",
fontWeight:"bold",
color:"#3498db",
marginTop:"10px"
}

const label={
fontSize:"14px",
color:"#888",
marginTop:"5px"
}

const progressBar={
width:"100%",
background:"#eee",
height:"8px",
borderRadius:"5px",
marginTop:"10px"
}

const todoSection={
background:"#fff",
marginTop:"25px",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 5px 15px rgba(0,0,0,0.08)"
}

const quickPanel={
background:"#fff",
padding:"20px",
marginTop:"25px",
borderRadius:"10px",
boxShadow:"0 5px 15px rgba(0,0,0,0.08)"
}

const quickButtons={
display:"flex",
gap:"10px",
flexWrap:"wrap",
marginTop:"10px"
}

const quickBtn={
padding:"10px 15px",
border:"none",
background:"#3498db",
color:"#fff",
borderRadius:"5px",
cursor:"pointer"
}

export default StudentDashboard;