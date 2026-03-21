import Sidebar from "./Sidebar";

function Layout({children}){

return(

<div style={{display:"flex"}}>

<Sidebar/>

<div style={{
marginLeft:"240px",
padding:"40px",
background:"#f4f6f9",
minHeight:"100vh",
width:"100%"
}}>

{children}

</div>

</div>

)

}

export default Layout;
