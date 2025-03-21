import { Routes,Route,Navigate } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";

function Routers(){
    return(
        <Routes>
            
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            
            
        </Routes>
    )
}

export default Routers;