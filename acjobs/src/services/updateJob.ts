import { JobInterface } from "../contexts/jobsContext";
import api from "./api";

const UpdateJob = async (data: JobInterface,token:string,id:string) => {
    
    try{
        const response = await api.put(`/api/v1/opening?id=${id}`,data, 
            {headers:{'Authorization': `Bearer ${token}`}}
        )
        
        return response

    }catch(error: any){
        throw new Error(error.message || "Erro ao atualizar vaga")
    }

}

export default UpdateJob;