import { Routes,Route,Navigate } from "react-router";
import Home from "../pages/Home";


function Routers(){
    return(
        <Routes>
            
            <Route path="/" element={<Home/>}/>
            
            
        </Routes>
    )
}