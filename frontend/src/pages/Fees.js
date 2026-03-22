import React, { useState, useEffect } from "react";
import axios from "axios";

function Fees() {

const [fees,setFees] = useState([]);
const [studentName,setStudentName] = useState("");
const [amount,setAmount] = useState("");
const [status,setStatus] = useState("Pending");

useEffect(()=>{
fetchFees();
},[]);

const fetchFees = async () => {

const res = await axios.get("https://campushub-backend-6r2u.onrender.com/api/fees");
setFees(res.data);

};

const addFee = async () => {

await axios.post("https://campushub-backend-6r2u.onrender.com/api/fees/add",{
studentName,
amount,
status
});

setStudentName("");
setAmount("");

fetchFees();

};

const deleteFee = async(id)=>{

await axios.delete(`https://campushub-backend-6r2u.onrender.com/api/fees/${id}`);

fetchFees();

}

return (

<div style={{padding:"30px"}}>

<h2>💰 Fees Management</h2>

<input
placeholder="Student Name"
value={studentName}
onChange={(e)=>setStudentName(e.target.value)}
/>

<input
placeholder="Amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
>

<option>Pending</option>
<option>Paid</option>

</select>

<button onClick={addFee}>
Add Fee
</button>

<table border="1" cellPadding="10">

<thead>

<tr>
<th>Student</th>
<th>Amount</th>
<th>Status</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{fees.map((f)=>(

<tr key={f._id}>

<td>{f.studentName}</td>
<td>{f.amount}</td>
<td>{f.status}</td>

<td>

<button onClick={()=>deleteFee(f._id)}>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default Fees;