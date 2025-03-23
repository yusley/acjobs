import './styles.css'
import { IoLocationOutline } from 'react-icons/io5';
import { PiCityDuotone } from "react-icons/pi";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { JobInterface } from '../../contexts/jobsContext';

type JobinterfaceOnActions = JobInterface & {
    click : React.MouseEventHandler<HTMLButtonElement> 
}

function CardJob ({...props}: JobinterfaceOnActions) {

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);
      };

    return(
        <div className="w-full xl:w-[45%] md:w-[45%] flex flex-col shadow-xl font-sans bg-[#fff] p-[1rem] text-3xl rounded-2xl gap-3">
            <div className="title">
                <h3 className="">{props.role}</h3>
            </div>
            <div className="modality">
                <p className='w-25 flex text-[1rem] bg-[#1FA774] text-amber-50 relative p-1 items-center justify-center rounded'>
                    {props.remote ? 'remoto':'presencial'}
                </p>
            </div>
            <div className="location py-1 flex items-center gap-1">
                <LiaMoneyBillWaveAltSolid />
                <p className='text-[1rem] font-semibold text-slate-600'>
                    {formatCurrency(props.salary)}
                </p>
            </div>
            <div className="location py-1 flex items-center gap-1">
                <IoLocationOutline/>
                <p className='text-[1rem] font-semibold text-slate-600'>
                    {props.location}
                </p>
            </div>
            
            <div className="details w-full flex justify-between mt-5">
                <div className="interpraise py-1 flex items-end gap-1">
                    <PiCityDuotone />
                    <p className='text-[1rem] font-semibold text-slate-600'>
                        {props.company}
                    </p>
                </div>
                <div className="detailsLink flex ">
                    
                    <button onClick={() => props.click} className='bg-[#1FA774] text-[#fff] text-[18px] p-3 cursor-pointer'>Detalhes {props.id}</button>
                    
                </div>
            </div>
        </div>
    )
}

export default CardJob;