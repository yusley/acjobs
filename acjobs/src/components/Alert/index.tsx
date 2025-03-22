import { Alert as AlertTailwind } from "@material-tailwind/react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
function Alert ({...props}) {
   

    return(
        <AlertTailwind
            icon={props.type == 'success' ? <FaRegCheckCircle/> : <IoAlertCircleOutline/>}
            className={`xl:w-[30rem] md:w-[30rem] sm:w-full top-1 right-0 h-[3rem] items-center rounded-none border-l-4
                
                ${props.type == 'success' && "border-[#2ec946] bg-[#45c958] text-[#d3ffda] "}
                ${props.type == 'fail' && "border-[#f5867e] bg-[#b44b43] text-[#fde5e5]"}
                
                font-medium absolute`}
        >
            {props.message}
        </AlertTailwind>
    )

}

export default Alert;