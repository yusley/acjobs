import { JobInterface } from "../contexts/jobsContext";
import api from "./api";

const CreateJob = async (data: JobInterface,token:string) => {
    
    try{
        const response = await api.post('/api/v1/opening',data, 
            {headers:{'Authorization': `Bearer ${token}`}}
        )
        
        return response

    }catch(error: any){
       
        throw new Error(error.message || "Erro ao cadastrar vaga")
    }

}

export default CreateJob;