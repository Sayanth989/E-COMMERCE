import Cart from "../../models/cart.js";

const updateCart = async (req,res)=>{
    try{
        const {quantity} = req.body;

        console.log(quantity);
        

        if(!quantity||quantity<1){
            return res.status(400).json({msg:'Quantity must be at least ! '})
        }

        const cart = await Cart.findOne({user:req.user.id});

        if(!cart){
            return res.status(404).json({msg:'cart not found'});
        }
//         find the specific item by its id
        const item =cart.items.find(
            item =>item._id.toString() === req.params.itemId
        );

// undate qun
        if(item.quantity<=0){
            cart.items = cart.items.filter(
                item=> item._id.toString() !==req.params.itemId
            );
        }


         if(!item){
            return res.status(404).json({msg:'item not found in'})
        }
   
        console.log('before',item.quantity);
        
         item.quantity = Number(quantity);

         console.log('after',item.quantity)

        await cart.save();
        res.status(200).json({msg:' Cart updated',cart});
    }
    catch(err){
        res.status(500).json({msg : err.message});
    }

};
export default updateCart;