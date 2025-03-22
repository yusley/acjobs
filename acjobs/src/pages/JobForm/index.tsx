import './styles.css'
import {motion} from 'framer-motion'
import { FormEvent, useReducer } from 'react';

interface VagaInterface {
    role: string;
    company: string;
    location: string;
    remote: boolean;
    link: string;
    salary: number;
}

const inititalVagaValue: VagaInterface = {
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

const reduce = (state:VagaInterface, action: Action) => {
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
            return {...state, salary: action.payload}
        case 'ADD_JOB':
            return inititalVagaValue
        default:
            return state
    }
}

function JobForm(){

    const [state,dispatch] = useReducer(reduce,inititalVagaValue)

    const handleValueInput = (inputName:string,value:string | number | boolean) =>{
        dispatch({type: `SET_${inputName.toLocaleUpperCase()}` , payload: value} as Action)
    }

    const handleVaga = (e: FormEvent) => {
        e.preventDefault()
        dispatch({type:'ADD_JOB'})
        console.log(state)
    }

    return(
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 1 }}
        >
            <div className="w-full flex flex-col justify-center items-center">
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
                                            className='w-full p-[1%] border-1 border-[#e0e0e0] mt-2 outline-0 rounded shadow' type="text"
                                            value={state.role}
                                            onChange={(e) => handleValueInput('role',e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col min-w-[300px]'>
                                        <label htmlFor="">Empresa:</label>
                                        <input 
                                            className='w-full p-[1%] border-1 border-[#e0e0e0] mt-2 outline-0 rounded shadow' type="text" 
                                            value={state.company}
                                            onChange={(e) => handleValueInput('company',e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5 flex-wrap my-[1rem]'>
                                    <div className='flex flex-col justify-between min-w-[300px]'>
                                        <label htmlFor="">Local:</label>
                                        <input 
                                            className='w-full p-[1%] border-1 border-[#e0e0e0] mt-2 outline-0 rounded shadow' type="text" 
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
                                            onChange={(e) => handleValueInput('remote',e.target.value)}
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
                                            className='w-full p-[1%] border-1 border-[#e0e0e0] mt-2 outline-0 rounded shadow' type="text" 
                                            value={state.link}
                                            onChange={(e) => handleValueInput('link',e.target.value)}    
                                        />
                                    </div>
                                    <div className='flex flex-col min-w-[300px]'>
                                        <label htmlFor="">Salário:</label>
                                        <input 
                                            className='w-full p-[1%] border-1 border-[#e0e0e0] mt-2 outline-0 rounded shadow' type="number" step="0.01" 
                                            value={state.salary}
                                            onChange={(e) => handleValueInput('salary',e.target.value)}
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