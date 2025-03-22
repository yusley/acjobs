import { useState } from 'react';
import './styles.css'
import { FaCaretDown,FaCaretUp } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { useNavigate } from 'react-router';

function Header(){

    const navigate = useNavigate()

    const [drop,setDrop] = useState(true);

    const handleNavigate = (router: string) =>{
        navigate(router)
    }

    return(
        <div className="header w-full flex justify-between px-[1rem]">
            <div className="flex justify-center items-center cursor-pointer">
                <img className='w-[10rem]' src="./public/logo.png" alt="" />
            </div>
            <div className="logout flex justify-center items-center">
               
                <div className="relative group ml-4 cursor-pointer">
                    <button onClick={() => setDrop(!drop)} className="px-4 py-2 flex items-center gap-2 rounded-md cursor-pointer">
                        <FaUserCog size={30} color='#fff' className='cursor-pointer' />
                        {drop ? <FaCaretDown size={20} color='#fff'/> : <FaCaretUp color='#fff' size={20}/>}
                       
                    </button>

                    <div className={`absolute ${drop ? 'hidden':''} bg-white text-black shadow-lg mt-1 min-w-[120px] rounded-md ml-[-1.5rem]`}>
                        <a href="#" onClick={() => handleNavigate('/')} className="block px-4 py-2 hover:bg-gray-200">Vagas</a>
                        <a href="#" onClick={() => handleNavigate('vaga')} className="block px-4 py-2 hover:bg-gray-200">Cadastrar Vaga</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-200">Logout</a>
                        
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default Header;
