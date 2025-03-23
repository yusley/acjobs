import { createContext,ReactNode,useContext } from "react";
import loginRequest from "../services/loginRequest";
import { useCookies } from "react-cookie";

export interface LoginDataInterface {
    email: string;
    password: string;
}

interface AuthContextInterface {
    login: (data:LoginDataInterface) => Promise<void>
};

interface AuthProviderInterface {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface)

function AuthProvider({children}:AuthProviderInterface){
    const [cookie,setCookie, removeCookie] = useCookies(['token']);
    const login = async (data:LoginDataInterface) =>{
        try{
            const loginResponse = await loginRequest(data)
            const expirationDate = new Date();
            expirationDate.setHours(expirationDate.getHours() + 24);
            setCookie('token',loginResponse.message, {expires: expirationDate})
        }catch(error){
            throw error;
        }
    }

    return(
        <AuthContext.Provider value={{login}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

export default AuthProvider