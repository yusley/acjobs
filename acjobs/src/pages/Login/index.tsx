import { FormEvent, useState } from "react"
import { useAuth } from "../../contexts/authContext";
import * as EmailValidator from 'email-validator'
import Alert from "../../components/Alert";


export function Login () {

    const {login} = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");
    

    const handleMensage = () => {
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        },4000)

        
    }

    const handleLogin  = async (e:FormEvent) => {
        
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!EmailValidator.validate(email)) {
            setError("Email inválido")
            handleMensage()
            return;
        }

        if(email.length < 11 || password.length < 3){
            setError("Usuário ou senha inválidos")
            handleMensage()
            console.log('erro')
            return;
            
        }

        try{
            await login?.({email,password})
            setSuccess('Sucesso ao efetuar login!')
            handleMensage()
            
        }catch(error:any){
            setError(error.message || "Erro ao tentar fazer login");
            handleMensage()
        }
        
        
    }

    return(
        <div className="h-screen flex justify-center items-center">
            
            {showAlert && <Alert type={error ? 'fail':'success'} message={success ? success : error}/>}

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