import CardJob from '../CardJob';
import './styles.css'
import { useJobs } from '../../contexts/jobsContext';
import { useNavigate } from 'react-router';

function ListJobs () {

    const {jobs} = useJobs();
    const navigate = useNavigate()
    

    return(
        <div className="w-full mb-[3rem] flex flex-col justify-center items-center">
            <div className="w-full max-w-[1200px] py-[2rem] flex flex-col justify-center">
                <h4 className='text-slate-400'>Foram encontrados {jobs.length} oportunidade</h4>
            </div>
            <div className="w-full max-w-[1200px] flex md:justify-center xl:justify-between gap-15 flex-wrap ">
                {jobs[0] ? (
                    jobs.map((job) => (
                        <CardJob
                            key={job.id}
                            company={job.company}
                            link={job.link}
                            location={job.location}
                            remote={job.remote}
                            role={job.role}
                            salary={job.salary}
                            id={job.id}
                            click={() => navigate(`/vaga/${job.id}`, {state:{job}})}
                        />
                    ))
                ):(<></>)}
                
            </div>
        </div>
    )
}

export default ListJobs;