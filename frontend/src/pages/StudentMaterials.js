import React, { useState, useEffect } from "react";
import StudentSidebar from "../components/StudentSidebar";

function StudentMaterials(){

const [materials,setMaterials] = useState([]);
const [preview,setPreview] = useState(null);

useEffect(()=>{
fetch("http://localhost:5000/materials")
.then(res=>res.json())
.then(data=>setMaterials(data))
},[])

return(

<div style={{display:"flex"}}>

<StudentSidebar/>

<div style={page}>

<h1 style={title}>📚 Study Materials</h1>

<div style={grid}>

{materials.map((m,i)=>(

<div key={i} style={card}>

<div style={icon}>📄</div>

<h3 style={materialTitle}>{m.title}</h3>

<div style={subject}>{m.subject}</div>

<div style={btnRow}>

<button
style={previewBtn}
onClick={()=>setPreview(`http://localhost:5000/uploads/${m.file}`)}

>

👁 Preview </button>

<a
href={`http://localhost:5000/uploads/${m.file}`}
target="_blank"
rel="noreferrer"
style={downloadBtn}

>

⬇ Download </a>

</div>

</div>

))}

</div>

{/* PREVIEW MODAL */}

{preview && (

<div style={modal}>

<div style={modalContent}>

<button style={closeBtn} onClick={()=>setPreview(null)}>✖</button>

<iframe
title="preview"
src={preview}
style={{width:"100%",height:"500px",border:"none"}}
/>

</div>

</div>

)}

</div>

</div>

)

}

/* ---------- STYLES ---------- */

const page={
flex:1,
padding:"40px",
background:"#f4f6f9",
minHeight:"100vh"
}

const title={
fontSize:"30px",
marginBottom:"30px",
color:"#2c3e50"
}

const grid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
gap:"25px"
}

const card={
background:"#fff",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 10px 25px rgba(0,0,0,0.08)",
textAlign:"center",
transition:"0.3s",
cursor:"pointer"
}

const icon={
fontSize:"40px",
marginBottom:"10px"
}

const materialTitle={
fontSize:"18px",
marginBottom:"10px",
color:"#2c3e50"
}

const subject={
display:"inline-block",
background:"#e3f2fd",
color:"#3498db",
padding:"4px 12px",
borderRadius:"20px",
fontSize:"13px",
marginBottom:"15px"
}

const btnRow={
display:"flex",
justifyContent:"center",
gap:"10px"
}

const previewBtn={
background:"#2ecc71",
color:"white",
border:"none",
padding:"8px 15px",
borderRadius:"6px",
cursor:"pointer"
}

const downloadBtn={
background:"#3498db",
color:"white",
padding:"8px 15px",
borderRadius:"6px",
textDecoration:"none"
}

const modal={
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.6)",
display:"flex",
justifyContent:"center",
alignItems:"center"
}

const modalContent={
background:"#fff",
padding:"20px",
borderRadius:"10px",
width:"70%",
position:"relative"
}

const closeBtn={
position:"absolute",
top:"10px",
right:"10px",
background:"red",
color:"white",
border:"none",
padding:"5px 10px",
borderRadius:"5px",
cursor:"pointer"
}

export default StudentMaterials;
