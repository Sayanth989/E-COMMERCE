import Cart from "../../models/cart.js";

const removeCart = async (req,res)=>{
    try{
        const cart = await Cart.findOne({user: req.user.id});

        if(!cart){
            return res.status(404).json({msg:'Cart not found'});

        }
       cart.itmes =cart.filter(
        itme => itme._id.toString() !== req.params.itemId
       );
       
       await cart.save();
       res.status(200).json({msg: ' itmes removed form cart',cart});

    }catch(err){
        res.status(500).json({msg : err.message});
    }
};

export default  removeCart;