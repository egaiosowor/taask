import { RiMenu2Fill } from "react-icons/ri";

function SidebarToggle({ onToggle }){
   
    return(
        <RiMenu2Fill 
            className="cursor-pointer text-2xl" 
            onClick={onToggle}
        />
    )
}

export default SidebarToggle;