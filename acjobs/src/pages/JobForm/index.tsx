import './styles.css'
import {motion} from 'framer-motion'
import { FormEvent, useReducer, useState } from 'react';
import { JobInterface } from '../../contexts/jobsContext';
import { useJobs } from '../../contexts/jobsContext';
import Alert from '../../components/Alert';
import { i } from 'framer-motion/client';

const inititalVagaValue: JobInterface = {
    role: '',
    company: '',
    location: '',
    remote: true,
    link: '',
    salary: 0,
}

type Action = 
| {type:"SET_ROLE",payload: string}
| {type:"SET_COMPANY",payload: string}
| {type:"SET_LOCATION",payload: string}
| {type:"SET_REMOTE",payload: boolean}
| {type:"SET_LINK",payload: string}
| {type:"SET_SALARY",payload: number}
| {type:"ADD_JOB"}

const reduce = (state:JobInterface, action: Action) => {
    switch (action.type){
        case 'SET_ROLE':
            return {...state, role: action.payload}
        case 'SET_COMPANY':
            return {...state, company: action.payload}
        case 'SET_LOCATION':
            return {...state, location: action.payload}
        case 'SET_REMOTE':
            return {...state, remote: action.payload}
        case 'SET_LINK':
            return {...state, link: action.payload}
        case 'SET_SALARY':
            return {...state, salary: Number(action.payload)}
        case 'ADD_JOB':
            return inititalVagaValue
        default:
            return state
    }
}

function JobForm(){

    const {registerJob,listJobs} = useJobs();
    const [state,dispatch] = useReducer(reduce,inititalVagaValue)

        const [error,setError] = useState("");
        const [success,setSuccess] = useState("");
        const [showAlert, setShowAlert] = useState(false);
        

    const handleValueInput = (inputName:string,value:string | number | boolean) =>{
        dispatch({type: `SET_${inputName.toLocaleUpperCase()}` , payload: value} as Action)
    }

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        }).format(value / 100);
    };
    
    const parseCurrency = (value: string): number => {
        let numericValue = value.replace(/\D/g, ""); 
        return numericValue ? parseInt(numericValue, 10) : 0;
    };
    


    const handleMensage = () => {
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        },4000)
    }

    function checkEmptyValues(state: JobInterface) {
        for (let key in state) {
          if (state.hasOwnProperty(key)) {
            if (state[key as keyof JobInterface] === '' || state[key as keyof JobInterface] === 0) {
              return true
            }
          }
        }
    }
      

    const handleVaga = async (e: FormEvent) => {
        setError('')
        setSuccess('')
        e.preventDefault()
        
      
        
        if(checkEmptyValues(state)){
            setError('Você precisa preencher todos os campos!')
            handleMensage()
            return;
        }
         
        try{
            
            await registerJob(state)
            setSuccess('Sucesso ao cadastrar vaga')
            handleMensage()
        }catch(error:any){
            setError(error.message)
            handleMensage()
        }

        dispatch({type:'ADD_JOB'})
        listJobs()
    }

    return(
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 1 }}
        >
            <div className="w-full px-2 flex flex-col justify-center items-center">
            {showAlert && <Alert type={error ? 'fail':'success'} message={success ? success : error}/>}

                <div className="w-full max-w-[1200px] py-[2rem] flex flex-col justify-center">
                    <h1 className='text-slate-400 text-3xl'>Cadastar Vaga</h1>
                </div>
                <div className="w-full flex justify-center items-center max-w-[1200px] bg-[#fff] rounded py-[5rem] shadow-2xl">
                    <div className="w-full max-w-[1000px] flex justify-between gap-10 p-[1%]">
                        <div className='form w-full flex flex-col'>
                            <form action="">
                                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5 flex-wrap my-[1rem]'>
                                    <div className='flex flex-col justify-between min-w-[300px]'>
                                        <label htmlFor="">Cargo:</label>
                                        <input 
                                            className={`w-full p-[1%] border-1 ${error && state.role === "" ? "border-[#ff2f2f]" : "border-[#e0e0e0]"}  mt-2 outline-0 rounded shadow' type="text`}
                                            value={state.role}
                                            onChange={(e) => handleValueInput('role',e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col min-w-[300px]'>
                                        <label htmlFor="">Empresa:</label>
                                        <input 
                                            className={`w-full p-[1%] border-1 ${error && state.company === "" ? "border-[#ff2f2f]" : "border-[#e0e0e0]"} mt-2 outline-0 rounded shadow' type="text`} 
                                            value={state.company}
                                            onChange={(e) => handleValueInput('company',e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5 flex-wrap my-[1rem]'>
                                    <div className='flex flex-col justify-between min-w-[300px]'>
                                        <label htmlFor="">Local:</label>
                                        <input 
                                            className={`w-full p-[1%] border-1 ${error && state.location === "" ? "border-[#ff2f2f]" : "border-[#e0e0e0]"} mt-2 outline-0 rounded shadow' type="text`}
                                            value={state.location}
                                            onChange={(e) => handleValueInput('location',e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col min-w-[300px]'>
                                        <label htmlFor="">Remoto:</label>
                                        {/* <input className='w-full p-[1%] border-1 border-[#e0e0e0] mt-2 outline-0 rounded shadow' type="text" /> */}
                                        <select 
                                            className='w-full p-[1.5%] border-1 border-[#e0e0e0] mt-2 outline-0 rounded shadow' name="cars" id="cars"
                                            value={`${state.remote}`}
                                            onChange={(e) => handleValueInput('remote',JSON.parse(e.target.value))}
                                        >
                                            <option value="true">Sim</option>
                                            <option value="false">Não</option>
                                        </select>

                                    </div>
                                </div>

                                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5 flex-wrap my-[1rem]'>
                                    <div className='flex flex-col justify-between min-w-[300px]'>
                                        <label htmlFor="">Link:</label>
                                        <input 
                                            className={`w-full p-[1%] border-1 ${error && state.link === "" ? "border-[#ff2f2f]" : "border-[#e0e0e0]"} mt-2 outline-0 rounded shadow' type="text`}
                                            value={state.link}
                                            onChange={(e) => handleValueInput('link',e.target.value)}    
                                        />
                                    </div>

                                    <div className='flex flex-col min-w-[300px]'>
                                    <label htmlFor="">Salário:</label>
                                    <input 
                                        className={`w-full p-[1%] border-1 ${error && state.salary <= 0 ? "border-[#ff2f2f]" : "border-[#e0e0e0]"} mt-2 outline-0 rounded shadow`} 
                                        type="text"
                                        value={formatCurrency(state.salary)}
                                        onChange={(e) => {
                                            const parsedValue = parseCurrency(e.target.value);
                                            handleValueInput("salary", parsedValue); 
                                        }}
                                    />
                                    </div>

                                </div>


                                <div className='w-full flex flex-wrap gap-5 my-[3rem] flex-row-reverse'>
                                    
                                    <div className="detailsLink flex w-full bg-amber-50">
                                        <button onClick={handleVaga} className='w-full bg-[#1FA774] text-[#fff] text-[18px] p-3 cursor-pointer rounded'>Salvar</button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default JobForm;