import CardJob from '../CardJob';
import './styles.css'

function ListJobs () {
    return(
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full max-w-[1200px] py-[2rem] flex flex-col justify-center">
                <h4 className='text-slate-400'>Foram encontrados 4780 oportunidade</h4>
            </div>
            <div className="w-full max-w-[1200px] flex md:justify-center xl:justify-between gap-15 flex-wrap ">
                <CardJob/>
                <CardJob/>
                <CardJob/>
                <CardJob/>
                <CardJob/>
                <CardJob/>
                <CardJob/>
                <CardJob/>
            </div>
        </div>
    )
}

export default ListJobs;