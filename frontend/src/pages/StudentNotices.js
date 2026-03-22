import React, { useEffect, useState } from "react";

function StudentNotices(){

const [notices,setNotices] = useState([]);

useEffect(()=>{

fetch("https://campushub-backend-6r2u.onrender.com/notices")
.then(res=>res.json())
.then(data=>{
setNotices(data);
});

},[]);

return(

<div style={page}>

<h2 style={title}>📢 College Notice Board</h2>

{notices.length===0 ? (

<p>No notices available</p>

) : (

<div style={container}>

{notices.map((n,index)=>(

<div key={n._id} style={card}>

{/* NOTICE IMAGE */}

{n.image && (

<img
src={`https://campushub-backend-6r2u.onrender.com/uploads/${n.image}`}
style={image}
/>

)}

<div style={content}>

{/* Latest badge */}

{index===0 && ( <span style={badge}>Latest</span>
)}

<h3 style={noticeTitle}>{n.title}</h3>

<p style={desc}>{n.description}</p>

<p style={date}>
📅 {n.date}
</p>

</div>

</div>

))}

</div>

)}

</div>

)

}

/* ---------- STYLES ---------- */

const page={
padding:"40px",
background:"#f4f6f9",
minHeight:"100vh"
}

const title={
fontSize:"30px",
marginBottom:"30px",
color:"#2c3e50"
}

const container={
display:"flex",
flexDirection:"column",
gap:"25px"
}

const card={
display:"flex",
background:"#fff",
borderRadius:"12px",
overflow:"hidden",
boxShadow:"0 12px 25px rgba(0,0,0,0.1)"
}

const image={
width:"260px",
height:"180px",
objectFit:"cover"
}

const content={
padding:"20px",
flex:1,
position:"relative"
}

const noticeTitle={
fontSize:"22px",
marginBottom:"10px",
color:"#2c3e50"
}

const desc={
fontSize:"15px",
color:"#555",
marginBottom:"10px"
}

const date={
fontSize:"13px",
color:"#888"
}

const badge={
position:"absolute",
top:"15px",
right:"15px",
background:"#e74c3c",
color:"#fff",
padding:"4px 10px",
borderRadius:"6px",
fontSize:"12px",
fontWeight:"bold"
}

export default StudentNotices;
