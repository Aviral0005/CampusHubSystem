import React, {useState} from "react";
import axios from "axios";

function TeacherMarks(){

const [studentName,setStudentName] = useState("");
const [rollNumber,setRollNumber] = useState("");
const [course,setCourse] = useState("");
const [subject,setSubject] = useState("");
const [marks,setMarks] = useState("");

const uploadMarks = async ()=>{

try{

await axios.post("http://localhost:5000/api/results/add",{

studentName,
rollNumber,
course,
subjects:[
{
name:subject,
marks:Number(marks)
}
]

});

alert("Result Added Successfully");

}catch(err){

console.log(err);
alert("Error adding result");

}

};

return(

<div style={{padding:"40px"}}>

<h2>Upload Marks</h2>

<input
placeholder="Student Name"
value={studentName}
onChange={(e)=>setStudentName(e.target.value)}
/><br/><br/>

<input
placeholder="Roll Number"
value={rollNumber}
onChange={(e)=>setRollNumber(e.target.value)}
/><br/><br/>

<input
placeholder="Course"
value={course}
onChange={(e)=>setCourse(e.target.value)}
/><br/><br/>

<input
placeholder="Subject"
value={subject}
onChange={(e)=>setSubject(e.target.value)}
/><br/><br/>

<input
placeholder="Marks"
value={marks}
onChange={(e)=>setMarks(e.target.value)}
/><br/><br/>

<button onClick={uploadMarks}>Upload</button>

</div>

)

}

export default TeacherMarks;