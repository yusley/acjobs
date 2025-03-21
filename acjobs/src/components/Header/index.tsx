import './styles.css'

function Header(){
    return(
        <div className="header w-full flex justify-between">
            <div className="">
                <img className='w-[10rem]' src="./public/logo.png" alt="" />
            </div>
            <div className="logout">
                logout
            </div>
            
        </div>
    )
}

export default Header;
