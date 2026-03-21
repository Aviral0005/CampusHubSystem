import React from "react";

function TeacherAttendance(){

return(

<div style={{padding:"40px"}}>

<h2>Mark Attendance</h2>

<table border="1" cellPadding="10">

<tr>
<th>Student Name</th>
<th>Present</th>
<th>Absent</th>
</tr>

<tr>
<td>Rahul</td>
<td><input type="radio" name="rahul"/></td>
<td><input type="radio" name="rahul"/></td>
</tr>

<tr>
<td>Aman</td>
<td><input type="radio" name="aman"/></td>
<td><input type="radio" name="aman"/></td>
</tr>

</table>

<button style={{marginTop:"20px"}}>Save Attendance</button>

</div>

)

}

export default TeacherAttendance;