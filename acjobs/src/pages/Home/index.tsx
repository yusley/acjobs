import './styles.css'
import Header from '../../components/Header';
import ListJobs from '../../components/ListJobs';
import {motion} from 'framer-motion'

function Home(){
    return(
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 1 }}
        >
            <ListJobs/>
        </motion.div>
    )
}

export default Home;