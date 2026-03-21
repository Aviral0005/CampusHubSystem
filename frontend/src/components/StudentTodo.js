import React, { useState, useEffect } from "react";

function StudentTodo(){

const [tasks,setTasks] = useState([]);
const [taskInput,setTaskInput] = useState("");

/* LOAD TASKS */

useEffect(()=>{

const savedTasks = localStorage.getItem("studentTasks");

if(savedTasks){
setTasks(JSON.parse(savedTasks));
}

},[]);

/* SAVE TASKS */

useEffect(()=>{

localStorage.setItem("studentTasks",JSON.stringify(tasks));

},[tasks]);

/* ADD TASK */

const addTask = ()=>{

if(taskInput.trim()==="") return;

setTasks([...tasks,{text:taskInput,done:false}]);
setTaskInput("");

};

/* COMPLETE TASK */

const toggleTask = (index)=>{

const updated = [...tasks];
updated[index].done = !updated[index].done;

setTasks(updated);

};

/* DELETE TASK */

const deleteTask = (index)=>{

const updated = tasks.filter((_,i)=>i!==index);
setTasks(updated);

};

return(

<div style={todoPanel}>

<h3>📋 Daily Routine / Todo</h3>

<div style={todoInputBox}>

<input
placeholder="Add new task..."
value={taskInput}
onChange={(e)=>setTaskInput(e.target.value)}
style={todoInput}
/>

<button onClick={addTask} style={addTaskBtn}>
Add
</button>

</div>

{tasks.map((task,index)=>(

<div key={index} style={todoItem}>

<span
onClick={()=>toggleTask(index)}
style={{
textDecoration: task.done ? "line-through" : "none",
cursor:"pointer"
}}

>

{task.text} </span>

<button
onClick={()=>deleteTask(index)}
style={deleteBtn}

>

✖ </button>

</div>

))}

</div>

)

}

/* STYLES */

const todoPanel={
background:"#fff",
padding:"20px",
marginTop:"25px",
borderRadius:"10px",
boxShadow:"0 5px 15px rgba(0,0,0,0.08)"
}

const todoInputBox={
display:"flex",
gap:"10px",
marginBottom:"15px"
}

const todoInput={
flex:1,
padding:"10px",
borderRadius:"5px",
border:"1px solid #ddd"
}

const addTaskBtn={
padding:"10px 15px",
background:"#27ae60",
color:"#fff",
border:"none",
borderRadius:"5px",
cursor:"pointer"
}

const todoItem={
display:"flex",
justifyContent:"space-between",
padding:"8px 0",
borderBottom:"1px solid #eee"
}

const deleteBtn={
background:"red",
border:"none",
color:"#fff",
borderRadius:"4px",
cursor:"pointer",
padding:"3px 8px"
}

export default StudentTodo;
