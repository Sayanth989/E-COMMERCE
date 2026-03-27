import { useNavigate } from "react-router-dom";



const Logout = ()=>{
    const navigate = useNavigate()
    

    const handleLogout = ()=>{

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');//home

   window.location.reload(); //just rest all sta
    };
    return(
        <button onClick={handleLogout} className="bg-transparent border-none cursor-pointer text-base font-semibold text-[#4a4c4c] hover:text-black transition">
            logout</button>

    )
}
export default Logout