import Cart from "../../models/cart.js";

const removeCart = async (req,res)=>{
    try{
        const cart = await Cart.findOne({user: req.user.id});

        if(!cart){
            return res.status(404).json({msg:'Cart not found'});

        }
       cart.items = cart.items.filter(
        (itme) => itme._id.toString() !== req.params.itemId          //For each item:
                                                                     // Convert _id to string
                                                                     //Compare with itemId from URL
                                                                   //Keep it ONLY if it is NOT equal
       );
       
       await cart.save();
       res.status(200).json({msg: ' itmes removed form cart',cart});

    }catch(err){
        res.status(500).json({msg : err.message});
    }
};

export default  removeCart;