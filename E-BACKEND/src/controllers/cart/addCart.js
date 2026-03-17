import Cart from "../../models/cart.js";

const addCart = async(req,res)=>{
    try{
        // 1 getting data form the req body
        const { productId, quantity } = req.body;

        // 2 check the fields
        if(!productId || !quantity){
            return res.status(400).json({msg: 'Product and quantity are required'})
        }

        // creating cart
        let cart = await Cart.findOne({user: req.user.id});


        if(!cart){ // if cannt find the cart its created
            
            cart = await Cart.create({user:req.user.id,items:[]});

        }

        //check if the product already in the cart it will increase the quantity
                            //chnged
        const existingItem = cart.items.find(
            item => item.product.toString()=== productId
        );
        
        if(existingItem){
            existingItem.quantity += quantity;
        }
        else{
            cart.items.push({product:productId,quantity});
        }
          //last step to save the cart
          await cart.save();
          res.status(200).json({msg: 'product added to cart',cart})
    }
    catch(err){
        res.status(500).json({msg: err.message},()=>{console.log('its addcart got crashedd');
        })
    }
};

export default addCart;