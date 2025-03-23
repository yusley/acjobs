import api from "./api";

const DeleteJob = async (token:string,id:string) => {
    
    try{
        const response = await api.delete(`/api/v1/opening?id=${id}`, 
            {headers:{'Authorization': `Bearer ${token}`}}
        )
        
        return response

    }catch(error: any){
        throw new Error(error.message || "Erro ao deletar vaga")
    }

}

export default DeleteJob;