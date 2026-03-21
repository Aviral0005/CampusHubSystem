import React, { useState, useEffect } from "react";

function StudyMaterial(){

const [title,setTitle] = useState("");
const [subject,setSubject] = useState("");
const [file,setFile] = useState(null);
const [materials,setMaterials] = useState([]);

useEffect(()=>{
fetch("http://localhost:5000/materials")
.then(res=>res.json())
.then(data=>setMaterials(data))
},[])

/* UPLOAD */

const uploadMaterial = async(e)=>{
e.preventDefault();

const formData = new FormData();
formData.append("title",title);
formData.append("subject",subject);
formData.append("file",file);

await fetch("http://localhost:5000/upload-material",{
method:"POST",
body:formData
})

alert("Material Uploaded");

window.location.reload();
}

/* DELETE */

const deleteMaterial = async(id)=>{

await fetch(`http://localhost:5000/delete-material/${id}`,{
method:"DELETE"
});

setMaterials(materials.filter(m=>m._id !== id));

}

return(

<div style={{display:"flex"}}>

<div style={page}>

<h1>Upload Study Material</h1>

<form onSubmit={uploadMaterial} style={card}>

<input
placeholder="Material Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
style={input}
/>

<input
placeholder="Subject"
value={subject}
onChange={(e)=>setSubject(e.target.value)}
style={input}
/>

<input
type="file"
onChange={(e)=>setFile(e.target.files[0])}
style={input}
/>

<button style={btn}>Upload Material</button>

</form>

<h2 style={{marginTop:"40px"}}>Uploaded Materials</h2>

<div style={grid}>

{materials.map((m)=>(

<div key={m._id} style={materialCard}>

<h3>{m.title}</h3>

<p>{m.subject}</p>

<div style={{display:"flex",gap:"10px"}}>

<a
href={`http://localhost:5000/uploads/${m.file}`}
target="_blank"
rel="noreferrer"
style={viewBtn}

>

View File </a>

<button
onClick={()=>deleteMaterial(m._id)}
style={deleteBtn}

>

Delete </button>

</div>

</div>

))}

</div>

</div>

</div>

)

}

/* STYLES */

const page={
flex:1,
padding:"40px",
background:"#f4f6f9",
minHeight:"100vh"
}

const card={
background:"white",
padding:"30px",
borderRadius:"10px",
boxShadow:"0 5px 15px rgba(0,0,0,0.1)",
display:"flex",
flexDirection:"column",
gap:"15px",
width:"350px"
}

const input={
padding:"10px",
borderRadius:"6px",
border:"1px solid #ccc"
}

const btn={
background:"#3498db",
color:"white",
border:"none",
padding:"12px",
borderRadius:"6px",
cursor:"pointer"
}

const grid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px",
marginTop:"20px"
}

const materialCard={
background:"white",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 5px 10px rgba(0,0,0,0.1)"
}

const viewBtn={
background:"#2ecc71",
color:"white",
padding:"6px 14px",
borderRadius:"6px",
textDecoration:"none"
}

const deleteBtn={
background:"#e74c3c",
border:"none",
color:"white",
padding:"6px 14px",
borderRadius:"6px",
cursor:"pointer"
}

export default StudyMaterial;
