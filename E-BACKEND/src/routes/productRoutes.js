import express, { Router } from "express";

import protect from "../middleware/auth.js";
import adminOnlyy from "../middleware/admin.js";

import uploads from "../middleware/upload.js";

import addProduct from "../controllers/product/addProduct.js";
import deleteProduct from "../controllers/product/deleteProduct.js";
import { getAllProducts,getOneProduct } from "../controllers/product/getProduct.js";
import updateProduct from "../controllers/product/updateProduct.js";


const router = express.Router();

//for public router anyone can see prodts
router.get('/',getAllProducts);
router.get('/:id',getOneProduct);

//only admin can 
router.post("/", protect, adminOnlyy, uploads.single('image'),addProduct);
router.put('/', protect,adminOnlyy,updateProduct)
router.delete('/:id',protect,adminOnlyy,deleteProduct);




export default router;