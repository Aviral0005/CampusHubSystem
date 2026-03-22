import Chatbot from "../components/Chatbot";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";

function Home() {

const [darkMode, setDarkMode] = useState(false);
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

const toggleTheme = () => {
  setDarkMode(!darkMode);
};

return (
<div style={darkMode ? darkPage : {}}>

{/* Navbar */}
<div style={isMobile ? mobileNavbar : navbar}>
<h2 style={{color:"white"}}>CampusHub System</h2>

<div style={isMobile ? mobileNavButtons : {display:"flex", alignItems:"center"}}>

<FaBell style={{color:"white", marginRight:"15px", cursor:"pointer"}} />

<button onClick={toggleTheme} style={themeBtn}>
{darkMode ? "☀️" : "🌙"}
</button>

<Link style={btn} to="/login">Student Login</Link>
<Link style={btn} to="/teacher-login">Teacher Login</Link>
<Link style={btn} to="/admin-login">Admin Login</Link>

</div>
</div>

{/* Hero Section */}
<div style={hero}>
<h1 style={isMobile ? {fontSize:"1.6rem"} : {}}>
Welcome to CampusHub System 🚀
</h1>

<p style={isMobile ? {fontSize:"0.9rem"} : {}}>
CampusHub System helps students, teachers
and administrators manage academic activities easily.
</p>

<div style={{
marginTop:"20px",
display:"flex",
flexDirection:isMobile ? "column" : "row",
gap:"10px",
justifyContent:"center"
}}>
<button style={heroBtn}>Get Started</button>
<button style={heroBtnOutline}>Explore</button>
</div>
</div>

{/* Stats Section */}
<div style={stats}>

<div style={{...(darkMode ? darkStatCard : statCard), width:isMobile ? "90%" : "180px"}}>
👨‍🎓 Students <h3>1200+</h3>
</div>

<div style={{...(darkMode ? darkStatCard : statCard), width:isMobile ? "90%" : "180px"}}>
👨‍🏫 Teachers <h3>75+</h3>
</div>

<div style={{...(darkMode ? darkStatCard : statCard), width:isMobile ? "90%" : "180px"}}>
📚 Courses <h3>25+</h3>
</div>

<div style={{...(darkMode ? darkStatCard : statCard), width:isMobile ? "90%" : "180px"}}>
📊 Attendance <h3>92%</h3>
</div>

</div>

{/* Info Section */}
<div style={info}>

<div style={{...(darkMode ? darkCard : card), width:isMobile ? "90%" : "250px"}}>
<h3>About College</h3>
<p>
CampusHub System provides quality education in BCA, BBA,
and other professional courses with modern facilities.
</p>
</div>

<div style={{...(darkMode ? darkCard : card), width:isMobile ? "90%" : "250px"}}>
<h3>Our Mission</h3>
<p>
To empower students with knowledge, skills and innovation
for future careers.
</p>
</div>

<div style={{...(darkMode ? darkCard : card), width:isMobile ? "90%" : "250px"}}>
<h3>Facilities</h3>
<p>
Smart classrooms, computer labs, library, sports facilities
and experienced faculty.
</p>
</div>

</div>

{/* Features */}
<div style={features}>

<div style={{...(darkMode ? darkFeatureCard : featureCard), width:isMobile ? "90%" : "200px"}}>📅 Attendance</div>
<div style={{...(darkMode ? darkFeatureCard : featureCard), width:isMobile ? "90%" : "200px"}}>📝 Assignments</div>
<div style={{...(darkMode ? darkFeatureCard : featureCard), width:isMobile ? "90%" : "200px"}}>📢 Notice</div>
<div style={{...(darkMode ? darkFeatureCard : featureCard), width:isMobile ? "90%" : "200px"}}>💬 Chat</div>
<div style={{...(darkMode ? darkFeatureCard : featureCard), width:isMobile ? "90%" : "200px"}}>📊 Reports</div>

</div>

{/* Events */}
<div style={events}>
<h2>Upcoming Events</h2>
<ul>
<li>📌 Hackathon - 25 March</li>
<li>📌 Exams - 5 April</li>
</ul>
</div>

{/* Footer */}
<div style={footer}>
<p>© 2026 CampusHub System | Made by Aviral 💙</p>
</div>

<Chatbot />

</div>
);
}

/* ================= STYLES ================= */

const mobileNavbar = {
display:"flex",
flexDirection:"column",
alignItems:"center",
padding:"15px",
background:"#1e293b"
};

const mobileNavButtons = {
display:"flex",
flexWrap:"wrap",
justifyContent:"center",
gap:"10px",
marginTop:"10px"
};

const darkPage = {
background:"#0f172a",
color:"white",
minHeight:"100vh"
};

const navbar={
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"15px 40px",
background:"#1e293b"
};

const btn={
color:"white",
textDecoration:"none",
marginLeft:"15px",
background:"#3b82f6",
padding:"8px 15px",
borderRadius:"5px",
transition:"0.3s"
};

const themeBtn={
marginRight:"10px",
padding:"6px 10px",
borderRadius:"5px",
border:"none",
cursor:"pointer"
};

const hero={
textAlign:"center",
padding:"80px 20px",
background:"linear-gradient(to right, #1e3c72, #2a5298)",
color:"white"
};

const heroBtn={
background:"#22c55e",
color:"white",
padding:"10px 20px",
border:"none",
borderRadius:"5px",
marginRight:"10px",
cursor:"pointer"
};

const heroBtnOutline={
background:"transparent",
color:"white",
padding:"10px 20px",
border:"1px solid white",
borderRadius:"5px",
cursor:"pointer"
};

const stats={
display:"flex",
justifyContent:"center",
gap:"20px",
padding:"30px",
flexWrap:"wrap"
};

const statCard={
background:"#f8fafc",
padding:"20px",
borderRadius:"10px",
width:"180px",
textAlign:"center"
};

const darkStatCard={
background:"#1e293b",
color:"white",
padding:"20px",
borderRadius:"10px",
width:"180px",
textAlign:"center"
};

const info={
display:"flex",
justifyContent:"center",
gap:"20px",
padding:"40px",
flexWrap:"wrap"
};

const card={
background:"white",
padding:"25px",
borderRadius:"10px",
width:"250px",
boxShadow:"0 3px 10px rgba(0,0,0,0.1)"
};

const darkCard={
background:"#1e293b",
color:"white",
padding:"25px",
borderRadius:"10px",
width:"250px",
boxShadow:"0 3px 10px rgba(0,0,0,0.5)"
};

const features={
display:"flex",
justifyContent:"center",
gap:"20px",
padding:"30px",
flexWrap:"wrap"
};

const featureCard={
background:"#e0f2fe",
padding:"20px",
borderRadius:"10px",
width:"200px",
textAlign:"center",
fontWeight:"bold"
};

const darkFeatureCard={
background:"#334155",
color:"white",
padding:"20px",
borderRadius:"10px",
width:"200px",
textAlign:"center",
fontWeight:"bold"
};

const events={
textAlign:"center",
padding:"40px"
};

const footer={
textAlign:"center",
padding:"20px",
background:"#1e293b",
color:"white",
marginTop:"20px"
};

export default Home;