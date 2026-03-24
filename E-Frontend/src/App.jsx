import { BrowserRouter,Routes,Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AdminLayout from './admin/AdminLayout'
import AdminAddProduct from './admin/AdminAddProduct'

import Home from './Home'
import './App.css'



//test
import ShopPage from './User/Shop-page/shop';



function App() {



  

  return (
   <BrowserRouter>

       <Routes>
        <Route path='/login' element ={<LoginPage />}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/admin'element ={<AdminLayout/>}/>
        <Route path='/addproduct' element={<AdminAddProduct/>}/>
        <Route path='/shop' element={<ShopPage/>}/>
      
        

        //test
        
       </Routes>





   </BrowserRouter>
  )
}

export default App
