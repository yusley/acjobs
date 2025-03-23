import api from "./api";

const ListJobsService = async (token:string) => {
    try{
        const response = await api.get('/api/v1/openings', {headers:{
            'Authorization': `Bearer ${token}`
        }})
        return response.data
        
    }catch(error:any){
        throw new Error(error.message || "Erro ao listar vagas")
    }
}

export default ListJobsService;