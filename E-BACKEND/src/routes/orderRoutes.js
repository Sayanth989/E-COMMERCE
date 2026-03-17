import express from 'express';
import protect from '../middleware/auth.js';
import adminOnly from '../middleware/admin.js';
import createOrder from '../controllers/order/createOrder.js';
import getOrder from '../controllers/order/getOrder.js';
import updateOrder from '../controllers/order/updateOrder.js';



const Orderrouter = express.Router()

//user routes
Orderrouter.post('/',protect,createOrder);
Orderrouter.get('/myord',protect,getOrder)

//admin only
Orderrouter.put('/:id',protect,adminOnly,updateOrder);


export default Orderrouter;