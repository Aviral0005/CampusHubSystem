import React,{useState} from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function AddTeacher(){

const [name,setName] = useState("");
const [teacherId,setTeacherId] = useState("");
const [email,setEmail] = useState("");
const [department,setDepartment] = useState("");
const [subject,setSubject] = useState("");
const [phone,setPhone] = useState("");

const addTeacher = async(e)=>{

e.preventDefault();

try{

await axios.post(
"http://localhost:5000/add-teacher",
{
name,
teacherId,
email,
department,
subject,
phone
}
);

alert("Teacher Added Successfully");

}catch(err){

alert("Error adding teacher");

}

};

return(

<div>

<Sidebar/>

<div style={{marginLeft:"240px",padding:"40px"}}>

<h1>Add Teacher</h1>

<form onSubmit={addTeacher}>

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

<input
placeholder="Teacher ID"
value={teacherId}
onChange={(e)=>setTeacherId(e.target.value)}
/>

<br/><br/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
placeholder="Department"
value={department}
onChange={(e)=>setDepartment(e.target.value)}
/>

<br/><br/>

<input
placeholder="Subject"
value={subject}
onChange={(e)=>setSubject(e.target.value)}
/>

<br/><br/>

<input
placeholder="Phone"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

<br/><br/>

<button type="submit">Add Teacher</button>

</form>

</div>

</div>

);

}

export default AddTeacher;