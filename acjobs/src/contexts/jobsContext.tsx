import { createContext,useContext,ReactNode, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import CreateJob from "../services/createJob";
import { AxiosResponse } from "axios";
import ListJobsService from "../services/listJobs";
import UpdateJob from "../services/updateJob";
import DeleteJob from "../services/deleteJob";


export interface JobInterface {
    id?: string;
    role: string;
    company: string;
    location: string;
    remote: boolean;
    link: string;
    salary: number;
    created_at?: string;
    updated_at?: string;
}

interface JobsContextInterface {
    jobs : JobInterface[];
    registerJob: (data: JobInterface) => Promise<void> | Promise<AxiosResponse<any, any>>;
    listJobs: () => Promise<void>;
    updateJob: (data: JobInterface,id:string) => Promise<void> | Promise<AxiosResponse<any, any>>;
    deleteJob: (id:string) => Promise<void> | Promise<AxiosResponse<any, any>>;
    typeAlert: string;
    messageAlert: string;
    alert: boolean;
    showAlert: (message:string,type:string) => void;
}

interface JobsProviderInterfce {
    children: ReactNode
}

export const JobsContext = createContext<JobsContextInterface>({} as JobsContextInterface);

function JobsProvider({children}:JobsProviderInterfce){


    const [cookie] = useCookies();

    const [jobs,setJobs] = useState<JobInterface[]>([])

    const [messageAlert,setMessageAlet] = useState('');

    const [typeAlert,setTypeAlert] = useState('');

    const [alert,setAlert] = useState(false);

    useEffect(() => {
        if(cookie.token){
            listJobs()
        }
        
        
    },[cookie.token])
    
    const showAlert = (message:string,type:string) => {
        setMessageAlet(message)
        setTypeAlert(type)
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        },4000)
    }

    const listJobs = async () => {
        
        const response = await ListJobsService(cookie.token)
        console.log(response.message)
        setJobs(response.message)
    }

    const registerJob = async (data: JobInterface) => {
        try{
            const response = await CreateJob(data,cookie.token)
            return response
        }catch(error){
            throw error
        }
    }

    const updateJob = async (data: JobInterface, id: string) => {
        try{
            const response = await UpdateJob(data,cookie.token,id)
            return response
        }catch(error){
            throw error
        }
    }

    const deleteJob = async (id:string) => {
        try{
            const response = await DeleteJob(cookie.token,id)
            return response
        }catch(error){
            throw error
        }
    }

    return(
        <JobsContext.Provider value={{jobs,registerJob,listJobs,updateJob,deleteJob,messageAlert,showAlert,typeAlert,alert}}>
            {children}
        </JobsContext.Provider>
    )
}

export const useJobs = () => {
    const context = useContext(JobsContext)
    return context
}

export default JobsProvider