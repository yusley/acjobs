import './styles.css'
import { IoLocationOutline } from 'react-icons/io5';

function CardJob ({...props}) {
    return(
        <div className="w-full max-w-[45%] flex flex-col shadow-xl font-sans bg-[#fff] p-[1rem] text-3xl rounded-2xl gap-3">
            <div className="title">
                <h3 className="">Analista de Dados</h3>
            </div>
            <div className="modality">
                <p className='w-25 flex text-[1rem] bg-green-500 text-amber-50 relative p-1 items-center justify-center rounded'>
                    Presencial
                </p>
            </div>
            <div className="location py-1 flex items-center">
                <IoLocationOutline/>
                <p className='text-[1rem] font-semibold text-slate-600'>
                    Rio Branco - AC
                </p>
            </div>
            <div className="details w-full flex justify-between mt-10">
                <div className="interpraise">
                    SONDA
                </div>
                <div className="detailsLink flex ">
                    <button className='bg-green-500 text-[#fff] text-[18px] p-3 cursor-pointer'>Detalhes</button>
                </div>
            </div>
        </div>
    )
}

export default CardJob;