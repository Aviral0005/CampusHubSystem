import React,{useState,useEffect} from "react";
import Layout from "../components/Layout";

function Notice(){

const [notices,setNotices]=useState([]);
const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [image,setImage]=useState(null);

useEffect(()=>{

fetch("https://campushub-backend-6r2u.onrender.com/notices")
.then(res=>res.json())
.then(data=>setNotices(data));

},[]);

const addNotice = async()=>{

const formData = new FormData();

formData.append("title",title);
formData.append("description",description);
formData.append("image",image);

await fetch("https://campushub-backend-6r2u.onrender.com/add-notice",{
method:"POST",
body:formData
});

window.location.reload();

};

const deleteNotice = async(id)=>{

await fetch(`https://campushub-backend-6r2u.onrender.com/delete-notice/${id}`,{
method:"DELETE"
});

setNotices(notices.filter(n=>n._id!==id));

};

return(

<Layout>

<h1 style={{
fontSize:"34px",
marginBottom:"30px"
}}>
📢 Notice Board
</h1>

{/* ADD NOTICE CARD */}

<div style={{
background:"white",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 8px 20px rgba(0,0,0,0.1)",
maxWidth:"500px",
marginBottom:"40px"
}}>

<h3>Add New Notice</h3>

<input
placeholder="Title"
onChange={(e)=>setTitle(e.target.value)}
style={input}
/>

<textarea
placeholder="Description"
onChange={(e)=>setDescription(e.target.value)}
style={textarea}
/>

<input
type="file"
onChange={(e)=>setImage(e.target.files[0])}
/>

<br/><br/>

<button onClick={addNotice} style={addBtn}>
➕ Add Notice
</button>

</div>


{/* NOTICE LIST */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",
gap:"20px"
}}>

{notices.map((n,index)=>(

<div key={index} style={card}>

{n.image && (

<img
src={`https://campushub-backend-6r2u.onrender.com/uploads/${n.image}`}
style={{
width:"100%",
height:"150px",
objectFit:"cover",
borderRadius:"8px",
marginBottom:"10px"
}}
/>

)}

<h3>{n.title}</h3>

<p>{n.description}</p>

<small>📅 {n.date}</small>

<br/><br/>

<button
onClick={()=>deleteNotice(n._id)}
style={deleteBtn}
>
Delete
</button>

</div>

))}

</div>

</Layout>

)

}


const input={
width:"100%",
padding:"10px",
marginBottom:"10px",
borderRadius:"6px",
border:"1px solid #ddd"
};

const textarea={
width:"100%",
padding:"10px",
marginBottom:"10px",
borderRadius:"6px",
border:"1px solid #ddd",
height:"90px"
};

const addBtn={
background:"#3498db",
color:"white",
border:"none",
padding:"10px 18px",
borderRadius:"6px",
cursor:"pointer"
};

const deleteBtn={
background:"#e74c3c",
color:"white",
border:"none",
padding:"7px 15px",
borderRadius:"6px",
cursor:"pointer"
};

const card={
background:"white",
padding:"20px",
borderRadius:"12px",
boxShadow:"0 10px 20px rgba(0,0,0,0.12)",
transition:"0.3s"
};

export default Notice;
