import api from "./api";
import { LoginDataInterface } from "../contexts/authContext";

const loginRequest = async (data: LoginDataInterface) => {
    try {
        const response = await api.post('/api/v1/login', data);
        return response.data;
    } catch (error: any) {
    
        throw new Error(error.response?.data?.message || "Erro ao tentar fazer login");
    }
};

export default loginRequest;