import './styles.css'
import {motion} from 'framer-motion'
import { FormEvent, useEffect, useReducer, useState } from 'react';
import { JobInterface } from '../../contexts/jobsContext';
import { useJobs } from '../../contexts/jobsContext';
import { useParams } from 'react-router';
import { useLocation } from 'react-router';
import { FaTrashCan } from "react-icons/fa6";
import ModalComponent from '../../components/Modal';
import { useNavigate } from 'react-router';

const inititalJobValue: JobInterface = {
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
| {type:"EDIT_JOB",payload:JobInterface}

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
            return inititalJobValue
        case 'EDIT_JOB':
            return action.payload
        default:
            return state
    }
}

function JobForm(){

    const {registerJob,listJobs,updateJob,deleteJob,showAlert} = useJobs();
    const [state,dispatch] = useReducer(reduce,inititalJobValue)

    const navigate = useNavigate();

    // estados reponsáveis pelas mensagens de erro
    const [error,setError] = useState(false);

    //parametros para edicao dos dados
    const [edit,setEdit] = useState(false)
    const {id} = useParams()
    const location = useLocation()
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // valida os parametros da url
        verifyEditionParams();
    },[])
    
    
    // abre o modal
    function openModal() {
        setIsOpen(true);
    }
    
    // fecha o modal
    function closeModal() {
        setIsOpen(false);
    }

    
    // verifica os parâmetros para edição
    const verifyEditionParams = () => {
        
        if(id){
            const statesData = location.state?.job
            dispatch({type:'EDIT_JOB',payload:statesData})
            setEdit(true)
            console.log(edit)
        }
    }

    // atualiza os valoes dos inputs
    const handleValueInput = (inputName:string,value:string | number | boolean) =>{
        dispatch({type: `SET_${inputName.toLocaleUpperCase()}` , payload: value} as Action)
    }

    //formata o valor monetario do salario
    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        }).format(value / 100);
    };
    
    // mascara para aplicar o valor no input
    const parseCurrency = (value: string): number => {
        let numericValue = value.replace(/\D/g, ""); 
        return numericValue ? parseInt(numericValue, 10) : 0;
    };
    

    // mostra o alert e fecha depois de 4 segundos

    // valida se os campos do form estão vazios
    function checkEmptyValues(state: JobInterface) {
        for (let key in state) {
          if (state.hasOwnProperty(key)) {
            if (state[key as keyof JobInterface] === '' || state[key as keyof JobInterface] === 0) {
              return true
            }
          }
        }
    }
      
    // cria uma nova vaga
    const handleCreateJob = async (e: FormEvent) => {
        setError(false)
        e.preventDefault()
        
          
        if(checkEmptyValues(state)){
            setError(true)
            showAlert('Você precisa preencher todos os campos!','fail')
            return;
        }
         
        try{
            await registerJob(state)
            
            showAlert('Sucesso ao cadastrar vaga','success')
        }catch(error:any){
            setError(true)
            showAlert(error.message,'fail')
            
        }

        dispatch({type:'ADD_JOB'})
        listJobs()
    }

    //edita vaga
    const handleEditJob = async (e:FormEvent) =>{
        setError(false)
        e.preventDefault()
      
        
          
        if(checkEmptyValues(state)){
            setError(true)
            showAlert('Você precisa preencher todos os campos!','fail')
            return;
        }
         
        try{
            await updateJob(state,state.id as string)
            
            showAlert('Sucesso ao editar vaga','success')
        }catch(error:any){
            setError(true)
            showAlert(error.message,'fail')
        }

        listJobs()
    }

    // remove uma vaga
    const handleDeleteJob = async () => {
        setError(false)
        
        try{
            await deleteJob(state.id as string)
            
            showAlert('Sucesso ao deletar vaga','success')
        }catch(error:any){
            setError(true)
            showAlert(error.message,'fail')
        }


        closeModal()
        listJobs()
        navigate('/')


    }


    return(
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 1 }}
        >   

            
            <ModalComponent 
                isOpen={modalIsOpen} 
                close={closeModal} 
                open={openModal}
                action={handleDeleteJob}
                title={"Excluir vaga"}
                message={"Você realmente deseja excluir esta vaga? Após esta ação, não será possível desfezê-la."}
                />



            <div className="w-full px-2 flex flex-col justify-center items-center">
            

                <div className="w-full max-w-[1200px] py-[2rem] flex flex-col justify-center">
                    <h1 className='text-slate-400 text-3xl'>{!edit ? "Cadastar Vaga" : "Gerenciar Vaga"}</h1>
                </div>
                <div className="w-full flex flex-col justify-center items-center max-w-[1200px] bg-[#fff] rounded py-[5rem] shadow-2xl">
                    <div className='w-full max-w-[1000px] px-[1%] py-[1%]  flex flex-row-reverse'>
                        <FaTrashCan onClick={openModal} className='cursor-pointer' color='#ff2f2f' size={30} />
                    </div>
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
                                    
                                    {!edit ?
                                        
                                        <div className="detailsLink flex w-full bg-amber-50">
                                            <button onClick={handleCreateJob} className='w-full bg-[#1FA774] text-[#fff] text-[18px] p-3 cursor-pointer rounded'>Salvar</button>
                                        </div>
                                        
                                        :
                                        <div className="detailsLink flex w-full bg-amber-50">
                                            <button onClick={handleEditJob} className='w-full bg-[#1FA774] text-[#fff] text-[18px] p-3 cursor-pointer rounded'>Salvar</button>
                                        </div>
                                    }
                                    

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