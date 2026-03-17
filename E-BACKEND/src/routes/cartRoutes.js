import express from 'express';
import protect from '../middleware/auth.js';
import addCart from '../controllers/cart/addCart.js';
import getCart from '../controllers/cart/getCart.js';
import updateCart from '../controllers/cart/updateCart.js';
import removeCart from '../controllers/cart/removeCart.js';

const router = express.Router();

// all cart routes need login
router.post('/', protect, addCart);
router.get('/', protect, getCart);
router.put('/:itemId', protect, updateCart);
router.delete('/:itemId', protect, removeCart);

export default router;