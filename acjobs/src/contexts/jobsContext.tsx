import { createContext,useContext,ReactNode, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import CreateJob from "../services/createJob";
import { AxiosResponse } from "axios";
import ListJobsService from "../services/listJobs";


export interface JobInterface {
    id?: string;
    role: string;
    company: string;
    location: string;
    remote: boolean;
    link: string;
    salary: number;
}

interface JobsContextInterface {
    jobs : JobInterface[];
    registerJob: (data: JobInterface) => Promise<void> | Promise<AxiosResponse<any, any>>;
    listJobs: () => Promise<void>;
}

interface JobsProviderInterfce {
    children: ReactNode
}

export const JobsContext = createContext<JobsContextInterface>({} as JobsContextInterface);

function JobsProvider({children}:JobsProviderInterfce){


    const [cookie] = useCookies();

    const [jobs,setJobs] = useState<JobInterface[]>([])

    useEffect(() => {
        if(cookie.token){
            listJobs()
        }
        
        
    },[cookie.token])

    const listJobs = async () => {

        const response = await ListJobsService(cookie.token)
        
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

    return(
        <JobsContext.Provider value={{jobs,registerJob,listJobs}}>
            {children}
        </JobsContext.Provider>
    )
}

export const useJobs = () => {
    const context = useContext(JobsContext)
    return context
}

export default JobsProvider