import Order from "../../models/order.js";
import Cart from "../../models/cart.js";
import Product from "../../models/product.js";

const createOrder = async(req,res)=>{
    try{
        //get shipping address form the body
        const {shippingAddress} = req.body;
        // get user's cart
        const cart = await Cart.findOne({user: req.user.id})
             .populate('items.product');

             //check the cart is empty
          if(!cart || cart.items.lenght ===0){
            return res.status(400).json({msg: 'Cart is empty'});
          }


          // calcuating the total and check the stock


          let totalAmount = 0;
          const orderItems = [];

          for(let item of cart.items){
            const product = item.product;

            // check the stock is enough
               //werehouse stock  // user i want stock
            if(product.stock < item.quantity){
                return res.status(400).json({msg: `Not enough stock for ${product.name}`
                });
            }

               totalAmount += product.price * item.quantity;

               //to push the order items
               orderItems.push({
                product:product._id,
                quantity:item.quantity,
                price: product.price
               });
          }

          //then creating the order 
          const order = await Order.create({
            user:req.user.id,
            itmes:orderItems,
            totalAmount,
            shippingAddress
          });
          
          //decrease stock for each product

          for(let item of cart.itmes){
            await Product.findByIdAndUpdate(
                item.product._id,
                {$inc:{stock: -item.quantity}}
            );
          }

          cart.items = [];
         await cart.save()

         // snt ot client 
         res.status(201).json({msg: 'Order placed successfully',order});


    }
    catch(err){
        res.status(500).json({msg :err.message},()=>{console.log('creating order is crashed')})

    }
};

export default createOrder