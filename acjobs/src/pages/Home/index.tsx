import './styles.css'
import Header from '../../components/Header';
import ListJobs from '../../components/ListJobs';
import {motion} from 'framer-motion'
import { useAuth } from '../../contexts/authContext';

function Home(){

    return(
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5 }}
        >
            <ListJobs/>
        </motion.div>
    )
}

export default Home;