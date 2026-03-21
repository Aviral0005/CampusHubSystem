import React,{useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import Sidebar from "../components/Sidebar";

function EditTeacher(){

const {id} = useParams();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [department,setDepartment] = useState("");
const [subject,setSubject] = useState("");
const [phone,setPhone] = useState("");

useEffect(()=>{

fetch("http://localhost:5000/teachers")
.then(res=>res.json())
.then(data=>{

const teacher = data.find(t=>t._id===id);

setName(teacher.name);
setEmail(teacher.email);
setDepartment(teacher.department);
setSubject(teacher.subject);
setPhone(teacher.phone);

});

},[id]);


const updateTeacher = async()=>{

await fetch(`http://localhost:5000/update-teacher/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
email,
department,
subject,
phone
})
});

alert("Teacher updated");

window.location="/teachers";

};


return(

<div>

<Sidebar/>

<div style={{marginLeft:"220px",padding:"40px"}}>

<h1>Edit Teacher</h1>

<input
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="Name"
/>

<br/><br/>

<input
value={email}
onChange={(e)=>setEmail(e.target.value)}
placeholder="Email"
/>

<br/><br/>

<input
value={department}
onChange={(e)=>setDepartment(e.target.value)}
placeholder="Department"
/>

<br/><br/>

<input
value={subject}
onChange={(e)=>setSubject(e.target.value)}
placeholder="Subject"
/>

<br/><br/>

<input
value={phone}
onChange={(e)=>setPhone(e.target.value)}
placeholder="Phone"
/>

<br/><br/>

<button onClick={updateTeacher}>
Update Teacher
</button>

</div>

</div>

)

}

export default EditTeacher;
