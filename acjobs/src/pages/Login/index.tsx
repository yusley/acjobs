import { FormEvent, useState } from "react"
import { useAuth } from "../../contexts/authContext";
import * as EmailValidator from 'email-validator'
import { useJobs } from "../../contexts/jobsContext";

export function Login () {

    const {login} = useAuth();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    const {showAlert} = useJobs();
    
    const handleLogin  = async (e:FormEvent) => {
        
        e.preventDefault()
        

        if (!EmailValidator.validate(email)) {
           
            showAlert('Email inválido','fail')
            return;
        }

        if(email.length < 11 || password.length < 3){
            showAlert('Usuário ou senha inválidos','fail')

            return;
            
        }

        try{
            await login?.({email,password})
            
            showAlert('Sucesso ao efetuar login','success')
        }catch(error:any){
            
            showAlert(error.message,'fail')
        }
        
        
    }

    return(
        <div className="h-screen flex justify-center items-center">
            
            

            <div className="w-full h-full sm:h-full lg:h-[90%] max-h-[800px] flex bg-white max-w-[100rem]">
                <div className="w-[50%] lg:flex md:flex hidden justify-center items-center">
                    <img src="../../public/login.svg" alt="" />
                </div>
                <div className="lg:w-[50%] md:w-[50%] w-[100%] p-2 bg-[#1FA774] flex gap-10 justify-center items-center flex-col">
                    <h1 className="text-4xl text-[#ffff]">Login</h1>
                    <form className="w-full max-w-[30rem] flex gap-5 justify-center items-center flex-col" action="">
                        <input 
                            className='w-full p-[1rem] font-medium text-blue-950 border-[1px] bg-[#F0F2F5] border-[#D7D7D7] rounded-[0.3rem] my-[0.5rem] focus:outline-none focus:ring-0' 
                            placeholder="Usuário"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input 
                            className='w-full p-[1rem] font-medium text-blue-950 border-[1px] bg-[#F0F2F5] border-[#D7D7D7] rounded-[0.3rem] my-[0.5rem] focus:outline-none focus:ring-0' 
                            placeholder="Senha"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input 
                            className='w-full bg-[#1FA774] p-[1rem] border-[1px] border-[#D7D7D7] rounded-[0.3rem] my-[1rem] text-[#FFFFFF] cursor-pointer' 
                            type="submit" 
                            value='Logar' 
                            onClick={handleLogin}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;