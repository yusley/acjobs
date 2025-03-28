import { Routes,Route,Navigate } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import JobForm from "../pages/JobForm";
import Header from "../components/Header";
import { AnimatePresence } from "framer-motion";
import {useCookies} from 'react-cookie'
import { useJobs } from "../contexts/jobsContext";
import Alert from "../components/Alert";
import Footer from "../components/Footer";

function Routers(){

    const [cookie] = useCookies();
    
    const {alert} = useJobs()

    return(
        <>  
            {alert && <Alert />}
            <AnimatePresence>
                {cookie.token && <Header/>}
                
                <Routes>
                    {cookie.token ? (
                        <>  
                            <Route path="/" element={<Home/>}/>
                            <Route path="/vaga" element={<JobForm/>}/>
                            <Route path="/vaga/:id" element={<JobForm/>}/>
                            <Route path="*" element={<Navigate to="/" />} />
                        </> ):(
                        <>
                        
                            <Route path="/login" element={<Login/>}/>
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )}
                    
                </Routes>
            </AnimatePresence>
            <Footer/>
        </>
    )
}

export default Routers;