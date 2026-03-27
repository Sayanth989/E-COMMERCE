import { Navigate } from "react-router-dom";

const AdminRoute =({children}) =>{

    const user = JSON.parse(localStorage.getItem('user'));

     //if the usr  not login go to login
    if(!user){return <Navigate to='/login'/>}
  
    //not admin go to home page
    if(user.role !=='admin'){
        return <Navigate to='/'/>

    }
    return children;
};

export default AdminRoute;