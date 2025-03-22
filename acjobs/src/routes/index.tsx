import { Routes,Route,Navigate } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import JobForm from "../pages/JobForm";
import Header from "../components/Header";
import { AnimatePresence } from "framer-motion";

function Routers(){
    return(
        <AnimatePresence>
            <Header/>
            <Routes>
                
                <Route path="/" element={<Home/>}/>
                <Route path="/vaga" element={<JobForm/>}/>
                <Route path="/login" element={<Login/>}/>
                
                
            </Routes>
        </AnimatePresence>
    )
}

export default Routers;