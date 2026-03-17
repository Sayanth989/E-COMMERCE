import Cart from "../../models/cart.js";

const getCart = async(req,res)=>{
    try{
        const cart = await Cart.findOne({user:req.user.id})
        .populate('items.product','name price image');

        if(!cart){
            return res.status(200).json({itmes:[]});
        }

        res.status(200).json(cart);

    }catch(err){
        res.status(500).json({msg:err.message})
    }

};

export default getCart;