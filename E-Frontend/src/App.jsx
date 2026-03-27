import { BrowserRouter,Routes,Route } from 'react-router-dom'

//authhhh
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

//admin pgs
import AdminRoute from './components/AdminRoute'
import AdminLayout from './admin/AdminLayout'
import AdminAddProduct from './admin/AdminAddProduct'

//user pags
import Home from './Home'
import ShopPage from './User/Shop-page/shop';
import CartPage from './User/Cart-page/CartPage'
import './App.css'



//test
import ProductDetailPage from './User/Sigle-Detail-page/ProductDetails'




function App() {



  

  return (
   <BrowserRouter>

       <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/shop' element={<ShopPage/>}/>
        <Route path='/cart'element={<CartPage/>}/>

        <Route path='/login' element ={<LoginPage />}/>
        <Route path='/signup' element={<SignupPage/>}/>


        <Route path='/admin'element ={<AdminRoute>
          <AdminLayout/>

        </AdminRoute>}/>

        <Route path='/addproduct' element={<AdminAddProduct/>}/>
     
      
        

        //test

        <Route path='/products/:id' element ={<ProductDetailPage/>}/>       
       </Routes>





   </BrowserRouter>
  )
}

export default App
