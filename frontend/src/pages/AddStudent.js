import React, { useState } from "react";

function AddStudent(){

const [name,setName] = useState("");
const [rollNumber,setRollNumber] = useState("");
const [course,setCourse] = useState("");
const [year,setYear] = useState("");

const handleAddStudent = async () => {

if(!name || !rollNumber || !course || !year){
alert("Please fill all fields");
return;
}

try{

const res = await fetch("https://campushub-backend-6r2u.onrender.com/add-student",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
name,
rollNumber,
course,
year
})
});

const data = await res.json();

alert(data.message || "Student added successfully");

setName("");
setRollNumber("");
setCourse("");
setYear("");

// redirect to students page
window.location="/students";

}catch(error){

console.log(error);
alert("Error adding student");

}

};

return(

<div style={{
textAlign:"center",
marginTop:"60px"
}}>

<h1>Add Student</h1>

<input
style={input}
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

<input
style={input}
placeholder="Roll Number"
value={rollNumber}
onChange={(e)=>setRollNumber(e.target.value)}
/>

<br/><br/>

<input
style={input}
placeholder="Course"
value={course}
onChange={(e)=>setCourse(e.target.value)}
/>

<br/><br/>

<input
style={input}
placeholder="Year"
value={year}
onChange={(e)=>setYear(e.target.value)}
/>

<br/><br/>

<button style={btn} onClick={handleAddStudent}>
Add Student
</button>

</div>

);

}

/* styles */

const input={
padding:"10px",
width:"250px",
borderRadius:"6px",
border:"1px solid #ccc"
};

const btn={
padding:"10px 25px",
background:"#3498db",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer"
};

export default AddStudent;